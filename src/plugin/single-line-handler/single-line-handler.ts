import { EzMouseEvent } from '../../event/event';
import { EzPoint } from '../../model';
import {getCenterPoint} from '../../utils/math';
import {EzLineShape, EzElement} from '../../view';
import {EzEdgeViewState, EzViewState} from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
import {
 BEND_CLASS, BEND_SIZE, getBend, getVirtualBend, SOURCE_BEND_CLASS, TERMINAL_BEND_CLASS, VIRTUAL_BEND_CLASS 
} from '../handler-dom';



/**
 *   handle move and change edge points for single selected {@link EzLineShape} 
 */
export class SingleLineHandler extends EzDiagramPlugin {
    private handlerAction:HandlerAction;

    private isPressMove = false;

    private selected:EzEdgeViewState;

    private bends:EzElement[]=[];

    private virtualBends:EzElement[]=[];

    private shapeEl:EzElement;

    private startPoint:EzPoint;

    private movingDistance:EzPoint;

    private bendIndex:number;

    canActivate(){
        return this.context.selectedViewStates?.length ===1 &&
             this.context.selectedViewStates[0] instanceof EzEdgeViewState &&
             this.context.selectedViewStates[0].shape instanceof EzLineShape;

    }

    onDeActivate(){
        this.reset();
    }

    onChangeSelection(_, next:EzViewState[]){
        this.destroyBends();
        this.selected = next[0] as EzEdgeViewState;
    }

    onDblClick({evt}:EzMouseEvent):void {
        const target = evt.target as Element;
        const view = this.diagram.view;
        const points = this.selected.points;
        if(target.matches(`.${BEND_CLASS}`)){
            this.handlerAction = HandlerAction.REMOVE_BEND;
            
            if(this.bendIndex===0 || this.bendIndex===points.length-1){
                return;
            }
            
            view.changeEdgePoint(this.selected, null, this.bendIndex, false);
        }
    }

    onMouseDown({evt}:EzMouseEvent){
        this.getHandlerAction(evt);
        if(!this.bends.length){
            this.generateBends();
            this.handlerAction = HandlerAction.MOVE_SHAPE;
        }
        this.startPoint = this.diagram.view.getMousePointRelateToContainer(evt);
    }

    onPressMove({evt}:EzMouseEvent):void{
        this.isPressMove = true;

        const view = this.diagram.view;
        const currentPoint = view.getMousePointRelateToContainer(evt);
        this.movingDistance = new EzPoint(currentPoint.x-this.startPoint.x, currentPoint.y-this.startPoint.y);

        switch(this.handlerAction){
        case HandlerAction.MOVE_SHAPE:
            view.movingEdge(this.selected, this.movingDistance);
            break;
        case HandlerAction.MOVE_BEND:
            view.changingEdgePoint(this.selected, currentPoint, this.bendIndex, true);
            break;
        case HandlerAction.MOVE_VIRTUAL_BEND:
            view.changingEdgePoint(this.selected, currentPoint, this.bendIndex, false);
            break;
        default:
            break;
        }
    }

    onMouseUp({evt}:EzMouseEvent){
        this.isPressMove = false;

        const view = this.diagram.view;
        const currentPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        this.movingDistance = new EzPoint(currentPoint.x-this.startPoint.x, currentPoint.y-this.startPoint.y);
        if(this.movingDistance.x ===0 && this.movingDistance.y ===0) return;


        switch(this.handlerAction){
        case HandlerAction.MOVE_SHAPE:
            view.moveEdge(this.selected, this.movingDistance);
            this.destroyBends();
            break;
        case HandlerAction.MOVE_BEND:
            view.changeEdgePoint(this.selected, currentPoint, this.bendIndex, true);
            break;
        case HandlerAction.MOVE_VIRTUAL_BEND:
            view.changeEdgePoint(this.selected, currentPoint, this.bendIndex, false);
            break;
        default:
            break;
        }

    }

    afterViewUpdate():void {
        this.destroyBends();
        this.generateBends();
    }

    private getHandlerAction(evt:MouseEvent):void {
        const target = evt.target as Element;
        this.bendIndex = +target.getAttribute('index');
        if(target.matches(`.${BEND_CLASS}`)){
            this.handlerAction = HandlerAction.MOVE_BEND;
        }else if(target.matches(`.${VIRTUAL_BEND_CLASS}`)){
            this.handlerAction = HandlerAction.MOVE_VIRTUAL_BEND;
        }else {
            this.handlerAction = HandlerAction.MOVE_SHAPE;
        }
    }

    private generateBends():void {
        if(this.isPressMove && this.handlerAction === HandlerAction.MOVE_SHAPE) return;
        this.shapeEl = this.selected.shape.root.clone().asHandler();
        const view = this.diagram.view;
        const points =this.selected.alternate?.points || this.selected.points;
        const size = BEND_SIZE * view.getScale();
        for(let i=0; i<points.length; i++){
            const point = points[i];
            const bend = getBend().attr({
                cx:point.x, cy:point.y, rx:size, ry:size, index:i
            });
            this.bends.push(bend);
            if(i>0){
                const virtualBendPosition = getCenterPoint(point, points[i-1]);
                const virtualBend = getVirtualBend().attr({
                    cx:virtualBendPosition.x, cy:virtualBendPosition.y, rx:size, ry:size, index:i
                });
                this.virtualBends.push(virtualBend);
            }

            if(i===0){
                bend.attr({class:`${BEND_CLASS} ${SOURCE_BEND_CLASS}`});
            }

            if(i===points.length-1){
                bend.attr({class:`${BEND_CLASS} ${TERMINAL_BEND_CLASS}`});
            }
            
        }
        this.diagram.view.overlayGroup.appendChildren([this.shapeEl, ...this.bends, ...this.virtualBends]);
    }

    private destroyBends():void {
        this.bends?.forEach(bend=>bend.el.remove());
        this.virtualBends?.forEach(bend=>bend.el.remove());
        this.shapeEl?.el.remove();
        this.bends = [];
        this.virtualBends = [];
        this.shapeEl=null;
    }

    private reset(){
        this.destroyBends();
        this.selected = null;
        this.startPoint = null;
        this.movingDistance = null;
    }
}

enum HandlerAction {
    MOVE_BEND,
    MOVE_SHAPE,
    REMOVE_BEND,
    MOVE_VIRTUAL_BEND
}