import { EzMouseEvent } from '../../event/event';
import {
 EzEdge, EzPoint, EzVertex 
} from '../../model';
import { EzConstraint } from '../../model/constraint/constraint';
import {
 getNormOfVector, getRotatedPoint, getVector, isPointInsideRect, toRectPoints 
} from '../../utils/math';
import { EzElement } from '../../view';
import { EzEdgeViewState, EzVertexViewState } from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
import { generateElements } from './common';


export class ConnectVertex extends EzDiagramPlugin {
    
    private _terminalType;

    private _connectTolerence = 10;

    private _constraintTolerence = 30;

    private _constraintPoints:EzPoint[];

    private _constraintPoint:EzPoint;

    private _constraint:EzConstraint;

    private _targetVertex:EzVertex;

    private _targetConstraints:EzConstraint[];

    private _handlerElement:EzElement;

    private get selected():EzEdgeViewState {
        const selected = this.context.selectedViewStates;
        if(selected) {
            if(selected.length>1) return;
            if(selected.length === 1){
                if(selected[0] instanceof EzEdgeViewState) return selected[0];
            }
        }
    }

    private _getTerminalType(evt:MouseEvent):EdgeTerminalType {
        const target = evt.target as Element;
        const el = EzElement.el(target);
        if(!el.hasAttr('handler')) return;
        const idx = Number(el.getAttr('index'));
        if(isNaN(idx)) return;
        if(idx === 0 ) return EdgeTerminalType.SOURCE;
        if(idx === this.selected.getPoints().length-1) return EdgeTerminalType.TARGET;
    }

    private _getTopMostIntersectedVertexState(point:EzPoint):EzVertexViewState {
        const view = this.diagram.view;
        const intersected = [];
        view.stateMapping.forEach(state=>{
            if(state instanceof EzEdgeViewState) return;
            if((state instanceof EzVertexViewState ) && state.style.editable !== false){
                const bounds = state.getBounds().clone().grow(this._constraintTolerence);
                const rect = toRectPoints(bounds, state.style.rotation);
                if(isPointInsideRect(rect, point)){
                    intersected.push(state);
                }
            }
        });

        // TODO return first matched vertex state for temporary use , remember to return top most state
        return intersected[0];
    }

    private _generateConnectionPoints(state:EzVertexViewState):void {
        if(this._handlerElement) return;

        const [_targetConstraints, _constraintPoints, _handlerElement] = generateElements(this.diagram.view, state);

        this._targetConstraints = _targetConstraints;
        this._constraintPoints = _constraintPoints;
        this._handlerElement = _handlerElement;
        this.diagram.view.overlayGroup.appendChild(this._handlerElement);
    }

    private _handleConnectToConnectionPoint(evt:MouseEvent):void {
        const view = this.diagram.view;
        const mousePosition = view.getMousePointRelateToContainer(evt);
        const distances = this._constraintPoints.map(point=>getNormOfVector(getVector(point, mousePosition)));
        const nearestDistance = Math.min(...distances);
        const idx = distances.findIndex(i=>i===nearestDistance);
        const nearestPoint = this._constraintPoints[idx];

        this._constraint = this._targetConstraints[idx];
        if(nearestDistance<=this._connectTolerence){
            this._constraintPoint = nearestPoint;
            view.changingEdgePoint(this.selected, nearestPoint, this._terminalType === EdgeTerminalType.SOURCE ? 0:this.selected.getPoints().length-1, true);
        }else {
            this._constraintPoint = null;
        }

    }

    private _destroyHandlerElement():void {
        this._handlerElement?.remove();
        this._handlerElement = null;
    }

    canActivate():boolean {
        return !!this.context.selectedViewStates?.length;
    }

    onDeActivate() {
    }

    onMouseDown({evt}:EzMouseEvent):void {
        if(!this.selected) return;
        this._terminalType = this._getTerminalType(evt);
    }

    onPressMove({evt}:EzMouseEvent):void {
        if(!this.selected) return;

        if(this._terminalType === EdgeTerminalType.SOURCE || this._terminalType === EdgeTerminalType.TARGET){
            const intersected = this._getTopMostIntersectedVertexState(this.diagram.view.getMousePointRelateToContainer(evt));
            if(intersected){
                this._targetVertex = intersected.node;
                this._generateConnectionPoints(intersected);
                this._handleConnectToConnectionPoint(evt);
            }else {
                this._destroyHandlerElement();
            }
        }
    }

    onMouseUp(){
        if(!this.selected) return;

        const view = this.diagram.view;
        if(this._constraintPoint){
            const index = this._terminalType === EdgeTerminalType.SOURCE ? 0:this.selected.getPoints().length-1;
            view.changeEdgePoint(this.selected, this._constraintPoint, index, true);
            view.updateTerminalVertex(this.selected, this._targetVertex, this._constraint, this._terminalType === EdgeTerminalType.SOURCE);
        }else {
            // TODO remove terminal vertex
        }
  
        this._destroyHandlerElement();
        this._constraintPoint = null;
        this._terminalType = null;
        this._targetVertex = null;
        this._constraint = null;
        this._targetConstraints = null;
    }

    private _updateRelatedEdgeTerminalPoint(state:EzVertexViewState, update:boolean):void {
        const s = state.alternate || state;
        const vertex = s.node;
        const edges = vertex.edges;
        const bounds = s.getBounds();
        const view = this.diagram.view;
        const getTerminalPoint = (edge:EzEdge, isSource:boolean)=>{
            const constraint = isSource?edge.sourceConstraint:edge.targetConstraint;
            const point = new EzPoint(bounds.x+constraint.percentX*bounds.width+constraint.offsetX, bounds.y+constraint.percentY*bounds.height+constraint.offsetY);
            return getRotatedPoint(point, s.style.rotation||0, bounds.center());
        };
        edges.forEach(edge=>{
            const isSource = edge.source === vertex;
            const point = getTerminalPoint(edge, isSource);
            const idx = isSource ? 0:edge.points.length-1;
            const state = view.stateMapping.get(edge.id) as EzEdgeViewState;
            update?view.changeEdgePoint(state, point, idx, true):view.changingEdgePoint(state, point, idx, true);
        });
    }

    onMoveVertex(state:EzVertexViewState):void {
        this._updateRelatedEdgeTerminalPoint(state, true);
    }

    onMovingVertex(state:EzVertexViewState):void{
        this._updateRelatedEdgeTerminalPoint(state, false);
    }

    onRotateVertex(state:EzVertexViewState):void {
        this._updateRelatedEdgeTerminalPoint(state, true);
    }

    onRotatingVertex(state:EzVertexViewState):void {
        this._updateRelatedEdgeTerminalPoint(state, false);
    }

    onResizingVertex(state:EzVertexViewState):void {
        this._updateRelatedEdgeTerminalPoint(state, true);
    }

    onResizeVertex(state:EzVertexViewState):void {
        this._updateRelatedEdgeTerminalPoint(state, false);
    }
}

enum EdgeTerminalType {
    SOURCE,
    TARGET
}