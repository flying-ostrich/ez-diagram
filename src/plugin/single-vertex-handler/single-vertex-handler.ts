import { EzMouseEvent } from '../../event/event';
import {EzPoint, EzRectangle} from '../../model';
import {getIncludedAngleOfTwoVector, getVector} from '../../utils/math';
import { EzElement } from '../../view';
import { EzVertexViewState } from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
import {
 getHandlerRects, getResizeBends, HandlerRects, Direction, ResizeBend, getRotationHandler, getHandlerContainer 
} from '../handler-dom';

enum HandlerAction {
    MOVE,
    RESIZE,
    ROTATE
}

/**
 *  handle move 、 rotate 、 resize action for single selected vertex
 */
export class SingleVertexHandler extends EzDiagramPlugin {
    selected:EzVertexViewState;

   /** selected bounding box with nine resize bends */
    handlerEl:EzElement;

    resizeAnchors:ResizeBend;

    handlerRects:HandlerRects;

    rotationHandler:EzElement;

    private _startPoint:EzPoint;

    private _handlerAction:HandlerAction;

    private _resizeAnchor:ResizeBend

    private _startAngle:number;

    private _deltaAngle:number;

    get handlerBounds():EzRectangle{
        return this.selected.alternate?.getBounds() || this.selected.getBounds();
    }

    canActivate(){
        return this.context.selectedViewStates?.length ===1 && this.context.selectedViewStates[0] instanceof EzVertexViewState;
    }

    onMouseDown({evt}:EzMouseEvent){
        this._startPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        const current = this.context.selectedViewStates[0] as EzVertexViewState;
        if(this.handlerEl){
            if(current === this.selected){
                this._handlerAction = this._getHandlerAction(evt);
            }else {
                this.selected = current;
                this._handlerAction = HandlerAction.MOVE;
            }
        }else {
            this.selected = current;
            this.resizeAnchors = getResizeBends();
            this.handlerRects = getHandlerRects(this.handlerBounds);
            this.rotationHandler = getRotationHandler();
            this._createHandlerEl();

            this._handlerAction = HandlerAction.MOVE;
        }

        this._updateHandlerEl();
    }

    onPressMove({evt}:EzMouseEvent){
        const view = this.diagram.view;
        const moveDistance = this._getMoveDistance(evt);
        if(this._handlerAction === HandlerAction.MOVE){
            if(moveDistance.x !== 0 || moveDistance.y !==0){
                view.movingVertex(this.selected, moveDistance);
            }
        }
        if(this._handlerAction === HandlerAction.RESIZE){
            view.resizingVertex(this.selected, this.diagram.view.getMousePointRelateToContainer(evt), this._resizeAnchor as unknown as Direction);
        }
        if(this._handlerAction === HandlerAction.ROTATE){
            const currentAngle = this._getAngleRelateToStateBounds(evt);
            this._deltaAngle = currentAngle - this._startAngle;
            view.rotatingVertex(this.selected, this._deltaAngle);
        }
        this._updateHandlerEl();
    }

    onMouseUp({evt}:EzMouseEvent){
        const view = this.diagram.view;
        const moveDistance = this._getMoveDistance(evt);
        if(this._handlerAction === HandlerAction.MOVE){
            if(moveDistance.x !== 0 || moveDistance.y !==0){
                view.moveVertex(this.selected, moveDistance);
            }
        }

        if(this._handlerAction === HandlerAction.RESIZE){
            view.resizeVertex(this.selected, view.getMousePointRelateToContainer(evt), this._resizeAnchor as unknown as Direction);
        }
       
        if(this._handlerAction === HandlerAction.ROTATE){
            const currentAngle = this._getAngleRelateToStateBounds(evt);
            this._deltaAngle = currentAngle - this._startAngle;
            view.rotateVertex(this.selected, this._deltaAngle);
        }

        this._updateHandlerEl();
        this._reset();
    }

    afterViewUpdate(){
        this._updateHandlerEl();
    }

    onDeActivate():void {
        this._destroy();
    }

    onChangeSelection():void {
        if(this.context.selectedViewStates.indexOf(this.selected) ===-1){
            this._destroy();
        }
    }

    private _destroy() {
        if (this.handlerEl) {
            this.handlerEl.remove();
            this.handlerEl = null;
        }
        this.selected = null;
        this._reset();
    }

    private _reset():void {
        this._startPoint = null;
        this._handlerAction = null;
        this._startAngle = 0;
        this._deltaAngle = 0;
    }

    private _getHandlerAction(evt:MouseEvent):HandlerAction {
        const target = evt.target as Element;
        if(Object.values(this.handlerRects).map(i=>i.el).indexOf(target)!==-1){
            return HandlerAction.MOVE;
        }
        if(Object.values(this.resizeAnchors).map(i=>i.el).indexOf(target)!==-1){
            this._resizeAnchor = +target.getAttribute('direction') as unknown as ResizeBend;
            return HandlerAction.RESIZE;
        }
        if(target.matches('.rotation-handler')){
            this._startAngle = this._getAngleRelateToStateBounds(evt);
            return HandlerAction.ROTATE;
        }
    }

    private _createHandlerEl():void {
        this.handlerEl =getHandlerContainer(this.selected).appendChildren([
            ...Object.values(this.handlerRects),
            ...Object.values(this.resizeAnchors),
            this.rotationHandler
        ]);
        this._updateHandlerEl();
        this.handlerEl.attr({pointerEvents:'none'});
        this.diagram.view.overlayGroup.appendChild(this.handlerEl);
        setTimeout(()=>{
            this.handlerEl.removeAttr('pointerEvents');
        },200);
    }

    private _updateHandlerEl():void {
        const getPosition = (x:number, y:number)=> {
            const pt = this.diagram.view.ensurePointMeetsGrid(new EzPoint(x, y));
            return {cx:pt.x, cy:pt.y};
        };
        const bounds = this.handlerBounds.plain();
        this.resizeAnchors[Direction.TOP_LEFT].attr(getPosition(bounds.x, bounds.y));
        this.resizeAnchors[Direction.TOP].attr(getPosition(bounds.x+bounds.width/2, bounds.y));
        this.resizeAnchors[Direction.TOP_RIGHT].attr(getPosition(bounds.x+bounds.width, bounds.y));
        this.resizeAnchors[Direction.RIGHT].attr(getPosition(bounds.x+bounds.width, bounds.y+bounds.height/2));
        this.resizeAnchors[Direction.BOTTOM_RIGHT].attr(getPosition(bounds.x+bounds.width, bounds.y+bounds.height));
        this.resizeAnchors[Direction.BOTTOM].attr(getPosition(bounds.x+bounds.width/2, bounds.y+bounds.height));
        this.resizeAnchors[Direction.BOTTOM_LEFT].attr(getPosition(bounds.x, bounds.y+bounds.height));
        this.resizeAnchors[Direction.LEFT].attr(getPosition(bounds.x, bounds.y+bounds.height/2));
        this.handlerRects.rect.attr(bounds);
        this.handlerRects.transparent.attr(bounds);
        this.rotationHandler.attr({
            x:bounds.x-18, y:bounds.y+bounds.height+6, width:16, height:16
        });

        const rotationAngle = (this.selected.style.rotation||0) + (this._deltaAngle||0);
        const rotationStep = this.diagram.configManager.rotationStep;
        this.handlerEl.attr({transform:`rotate(${rotationStep === 0?rotationAngle:Math.floor(rotationAngle/rotationStep)*rotationStep},${this.handlerBounds.center().x},${this.handlerBounds.center().y})`});
    }

    private _getMoveDistance(evt:MouseEvent):EzPoint {
        const pt = this.diagram.view.getMousePointRelateToContainer(evt);
        return new EzPoint(pt.x-this._startPoint.x, pt.y-this._startPoint.y);
    }

    private _getAngleRelateToStateBounds(evt:MouseEvent):number {
        const view = this.diagram.view;
        const currentPoint = view.getMousePointRelateToContainer(evt);
        const stateCenterPoint = this.selected.getBounds().center();
        const angle = getIncludedAngleOfTwoVector(getVector(stateCenterPoint, currentPoint), {x:0, y:1});
        return stateCenterPoint.x - currentPoint.x > 0 ? angle:-angle;
    }
}