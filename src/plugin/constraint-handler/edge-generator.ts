import { EzMouseEvent } from '../../event/event';
import { EzPoint } from '../../model';
import {
 BUILTIN_MARKER, BUILTIN_SHAPE, EzElement 
} from '../../view';
import { EzEdgeViewState, EzVertexViewState } from '../../view/view/view-state';
import { BUILTIN_PLGUIN } from '../constant';
import { EzDiagramPlugin } from '../diagram-plugin';
import { generateElements } from './common';
import { EzEdge } from '../../model';
import { EzConstraint } from '../../model/constraint/constraint';

export class EdgeGenerator extends EzDiagramPlugin {

    private _handlerElement:EzElement;

    private _constraintGrow = 0;

    private _constraintPoint:EzPoint;

    private _constraint:EzConstraint;

    private _constraintPoints:EzPoint[];

    private _tempEdge:EzEdgeViewState;

    private _currentVertex:EzVertexViewState;

    private _targetConstraints:EzConstraint[];

    /** selected vertex */
    private get selected():EzVertexViewState {
        const selected = this.context.selectedViewStates;
        if(selected) {
            if(selected.length>1) return;
            if(selected.length === 1){
                if(selected[0] instanceof EzVertexViewState) return selected[0];
            }
        }
    }

    private get state():EzVertexViewState {
        return this.selected?.alternate || this.selected;
    }
    
    beforeCallingHook({evt}:EzMouseEvent):void{
        const target = EzElement.el(evt.target as Element);
        if(evt.type === 'mousedown' && !this.selected && target.is('.edge-generate-bend')){
            this._setSelectPluginDisabled(true);
        }
    }

    onMouseDown({evt}:EzMouseEvent):void {
        if(!this._isEdgeGenerateBend(evt))return;
        
        const [_constraint, _constraintPoint] = this._getTargetConstraintInfo(evt);
        this._constraint = _constraint;
        this._constraintPoint = _constraintPoint;
    }   

    onMouseMove({evt, state}:EzMouseEvent):void {
        if(state && state instanceof EzVertexViewState){
            if(!this._handlerElement && !this.selected && state.style.editable !==false){
                const [_targetConstraints, _constraintPoints, _handlerElement ] = generateElements(this.diagram.view, state, this._constraintGrow);
                this._handlerElement = _handlerElement;
                this._constraintPoints = _constraintPoints;
                this._currentVertex = state;
                this._targetConstraints = _targetConstraints;
                this.diagram.view.overlayGroup.appendChild(_handlerElement);
            }else if(this._currentVertex !== state){
                this._reset();
            }
        }else if(!this._constraintPoint){
            this._reset();
        }

        if(this._constraintPoint){
            this.diagram.clearSelection();
            const view = this.diagram.view;
            const current = view.getMousePointRelateToContainer(evt);
            if(this._tempEdge){
                view.changingEdgePoint(this._tempEdge, current, 1, true);
            } else {
                const node = new EzEdge([this._constraintPoint.clone(), current.clone()], {shape: BUILTIN_SHAPE.LINE, markerEnd:BUILTIN_MARKER.TRIANGLE, });
                this._tempEdge = view.addTempState(node) as EzEdgeViewState;
            }
            
        }
    }

    onMouseUp({evt}:EzMouseEvent):void {
        const diagram = this.diagram;
        const view = diagram.view;
        const current = view.getMousePointRelateToContainer(evt);
        if(this._tempEdge){
            view.changeEdgePoint(this._tempEdge, current, 1, true);
            const viewPoints = this._tempEdge.alternate.getPoints();
            view.removeTempState(this._tempEdge);
            const modelPoints = viewPoints.map((point)=>{
                return new EzPoint(point.x/view.getScale()-view.getTranslate().x, point.y/view.getScale()-view.getTranslate().y);
            });
            
            const edge = this._tempEdge.node;
            edge.points = modelPoints;
            edge.source = this._currentVertex.node;
            edge.sourceConstraint = this._constraint;
            diagram.addEdge(edge);
        }


        this._setSelectPluginDisabled(false);
        this._constraintPoint = null;
        this._constraint = null;
        this._constraintPoints = null;
        this._targetConstraints = null;
        this._tempEdge = null;
    }

    onChangeSelection():void {
        if(this.selected){
            this._reset();
        }
    }

    private _setSelectPluginDisabled(disabled:boolean):void {
        const pluginManager = this.diagram.pluginManager;
        const selectPlugin = pluginManager.getPlugins().get(BUILTIN_PLGUIN.SELECT);
        selectPlugin?.setDisabled(disabled);
    }

    private _getTargetConstraintInfo(evt:MouseEvent):[EzConstraint, EzPoint] {
        if(this._isEdgeGenerateBend(evt)){
            const el =EzElement.el(evt.target as Element);
            const index = +el.data('index');
            return [this._targetConstraints[index], this._constraintPoints[index]];
        }
    }

    private _isEdgeGenerateBend(evt:MouseEvent):boolean {
        const el =EzElement.el(evt.target as Element);
        return el.is('.edge-generate-bend');
    }

    private _reset():void {
        this._handlerElement?.remove();
        this._handlerElement = null;
    }
}