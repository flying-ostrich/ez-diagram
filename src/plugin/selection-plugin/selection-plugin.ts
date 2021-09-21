import { EzDiagram } from '../../diagram/diagram';
import { EzMouseEvent } from '../../event/event';
import {EzPoint, EzRectangle} from '../../model';
import {getNormOfVector, getVector} from '../../utils/math';
import { EzElement } from '../../view';
import { EzDiagramView } from '../../view/view/view';
import { EzViewState } from '../../view/view/view-state';
import {EzDiagramPlugin, EzPluginContext} from '../diagram-plugin';

/**
 *  selection plugin is a built in plugin that handles element selection in a diagram,for example: 
 *  + if you click on a single element(edge or vertex) , the element will be selected and will be placed in the {@link EzDiagramPluginManager.pluginContext}
 *  + if you use mouse dragging to select multiple elements, those elements will  also be placed in the {@link EzDiagramPluginManager.pluginContext}
 * 
 *  access the selected element via:
 *  ```javascript
 *     // diagram is instance of EzDiagram
 *     const selected = diagram.pluginManager.getContext().selectedViewStates;
 *  ```
 */
export class SelectPlugin extends EzDiagramPlugin {
    static SELECTION_BOX_TOLERANCE = 4;

    startPoint:EzPoint;

    selectionBox:Element;

    selectionArea:EzRectangle;
   
    constructor(diagram:EzDiagram, context:EzPluginContext){
        super(diagram, context);
        this.createSelectionBox();
    }

    get selected():EzViewState[] {
        return this.context.selectedViewStates || [];
    }

    canActivate():boolean {
        return true;
    }

    private createSelectionBox():void {
        this.selectionBox=EzElement.el('rect').attr({
            stroke:'#0000DD',
            strokeWidth:1,
            fill:'#99ccff2b',
            x:0,
            y:0,
            width:SelectPlugin.SELECTION_BOX_TOLERANCE,
            height:SelectPlugin.SELECTION_BOX_TOLERANCE
        }).el;
    }

    private getInterSelectionStates(view:EzDiagramView):EzViewState[] {
        const svg = view.svg.el as SVGSVGElement;
        const rect = svg.createSVGRect();
        rect.x = this.selectionArea.x;
        rect.y = this.selectionArea.y;
        rect.width = this.selectionArea.width;
        rect.height = this.selectionArea.height;
        const nodeList = svg.getIntersectionList(rect, null);
        const states = [];
        nodeList.forEach(node=>{
            const state = view.getState(node);
            if(state) states.push(state);
        });

        return states;
    }


    onMouseDown({state, evt}:EzMouseEvent){
        this.startPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        if(state?.style.selectable === false) {
            this.changeSelection([]);
            this.selectionBox.remove();
            this.selectionArea = null;
            return;
        }
        if(this.isHandlerEvent(evt)) return;

        if(state) {
            if(this.context.selectedViewStates?.includes(state)) return;
            else this.changeSelection([state]);
        } else {
            this.changeSelection([]);
        }
    }

    onPressMove({state, evt}:EzMouseEvent){
        if(state?.style.selectable === false) return;
        if(this.selected.length) return;
        const view = this.diagram.view;

        const currentPoint = this.diagram.view.getMousePointRelateToContainer(evt);
        const moveDistance = getNormOfVector(getVector(this.startPoint, currentPoint));
        if(moveDistance>SelectPlugin.SELECTION_BOX_TOLERANCE){
            view.overlayGroup.appendChild(EzElement.el(this.selectionBox));
            this.selectionArea = new EzRectangle(Math.min(this.startPoint.x, currentPoint.x), Math.min(this.startPoint.y, currentPoint.y), Math.abs(this.startPoint.x-currentPoint.x), Math.abs(this.startPoint.y-currentPoint.y));
            EzElement.el(this.selectionBox).attr({
                x:this.selectionArea.x, y:this.selectionArea.y, width:this.selectionArea.width, height:this.selectionArea.height
            });
        }else {
            this.selectionBox.remove();
            this.selectionArea = null;
        }
    }

    onMouseUp({state}):void {
        this.selectionBox?.remove();

        if(state?.style.selectable === false) return;
        if(this.selected.length) return;

        if(this.selectionArea){
            const view=this.diagram.view;
            if(view.svg['getIntersectionList']){
                const states = this.getInterSelectionStates(view);
                this.changeSelection(states);
                this.selectionArea = null;
            }else {
                // TODO note that some modern browser does not support SVGSVGElement.getIntersectionList , eg.  FireFox
                // we will find other way to deal with this situation
            }
        }
    }

    /**
     *  check removing state is currently selected , if true , remove it from selected states 
     */
    onRemoveState(state:EzViewState):void {
        const idx = this.selected.indexOf(state);
        if(idx !==-1){
            const prev = [...this.selected];
            this.selected.splice(idx, 1);
            this.diagram.pluginManager.callHook('onChangeSelection', prev, this.selected);
        }
    }

    /**
     * change current selected states
     * @param selectedStates 
     */
    public changeSelection(selectedStates:EzViewState[]):void {
        const prev = this.context.selectedViewStates;
        this.context.selectedViewStates = selectedStates;
        this.diagram.pluginManager.callHook('onChangeSelection', prev, selectedStates);
    }
    

    private isHandlerEvent(evt:MouseEvent):boolean {
        const target = evt.target as Element;
        if(!target) return false;

        const el = EzElement.el(target);
        const handlerSelector = '[handler="1"]';
        return el.is(handlerSelector) || !!el.nearestAncestor(handlerSelector); 
    }
}