import {EZ_VIEW_EDGE_CLASS, EZ_VIEW_VERTEX_CLASS} from '../../constants';
import { EzDiagram } from '../../diagram/diagram';
import { EzEvent } from '../../event/event';
import {
 EzEdge, EzRectangle, EzVertex
} from '../../model';
import { EzConstraint } from '../../model/constraint/constraint';
import { EzDiagramNode } from '../../model/diagram-node';
import { EzPoint } from '../../model/point';
import { Direction, HANDLER_CONTAINER_CLASS } from '../../plugin/handler-dom';
import {
 getCenterPoint, getNormOfVector, getScalarMulOfVector, getUnitVector, getVector, getVectorEndPoint, getVectorProjection, toRectPoints, Vector 
} from '../../utils/math';
import { EzElement } from '../canvas/ez-element';
import { EzMarkerRegister } from '../marker/marker-register';
import { EzShapeStyle } from '../shape';
import { EzShapeManager } from '../shape/shape-manager';
import { getSvgStyle } from '../style/style';
import {
 EzEdgeViewState, EzVertexViewState, EzViewState, STATE_WORK_TYPE 
} from './view-state';

export class EzDiagramView {

    private _diagram:EzDiagram;

    private _translate = new EzPoint(0, 0);

    private _scaleCenter = new EzPoint(0, 0);

    private _scale = 1;

    public svg:EzElement;

    public defs:EzElement;

    public shapeGroup:EzElement;

    public overlayGroup:EzElement;

    public stateMapping = new Map<string, EzViewState>();

    public shapeManager = new EzShapeManager();

    public states:EzViewState [] = [];

    public dirtyStates:EzViewState[] = [];

    public size:DOMRect;

    constructor(diagram:EzDiagram){
        this._diagram = diagram;
        this._init();
    }

    private _init() {
        this._createSvg();
        this._createDefs();
        this._createShapeGroup();
        this._createOverlayGroup();
        this._createEventSystem();
        this._startCommitLoop();
        this.stateMapping.clear();
        this.states.length = 0;
        this.dirtyStates.length =0;
    }

    private _startCommitLoop():void {
        const step = ()=> {
            this.commit();
            window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    public getScale():number {
        return this._scale;
    }

    public setScale(scale:number):void {
        this._diagram.pluginManager.callHook('onScaleDiagram', this._scale, scale);
        this._scale = scale;
    }

    public translate(offset:EzPoint):void {
        this.setTranslate(this.getTranslate().clone().translate(offset));
    }

    public setTranslate(translate:EzPoint):void {
        this._diagram.pluginManager.callHook('onTranslateDiagram', this._translate.clone(), translate);
        this._translate= translate;
    }

    public getTranslate():EzPoint {
        return this._translate;
    }

    public rerender():EzElement {
        this._init();
        const svg = this.render();
        this.diagram.pluginManager.callHook('onRendered');
        return svg;
    }

    public render():EzElement {
        const nodes = this.diagram.model.nodes;
        nodes.forEach(child=>{
            let state:EzViewState;
            if(child instanceof EzVertex && !this.stateMapping.get(child.id)){
                state = this._createState<EzVertexViewState>(child);
                this.stateMapping.set(child.id, state);
                this.states.push(state);
            } 

            if(child instanceof EzEdge && !this.stateMapping.get(child.id)){
                state = this._createState<EzEdgeViewState>(child);
                this.stateMapping.set(child.id, state);
                this.states.push(state);
            } 
        });

        requestAnimationFrame(()=>{
            this.size = this.svg.el.getBoundingClientRect();
        });
        return this.svg;
    }

    public getState(el:Element):EzViewState {
        const elm = EzElement.el(el);
        let stateEl = elm.farestAncestor(`.${EZ_VIEW_VERTEX_CLASS}`);
        if(!stateEl) stateEl = elm.farestAncestor(`.${EZ_VIEW_EDGE_CLASS}`);
        if(!stateEl) stateEl = elm.farestAncestor(`.${HANDLER_CONTAINER_CLASS}`);
        if(stateEl){
            const stateId = stateEl.data('id');
            return this.stateMapping.get(stateId);
        }
    }

    private _createEventSystem():void {
        const ev = new EzEvent(this._diagram, this);
        ev.setupEventSystem(this.svg.el);
    }

    private _createSvg():void{
        this.svg = EzElement.el('svg');
    }

    private _createDefs(): void {
        this.defs = EzElement.el('defs');
        this.svg.appendChild(this.defs);
    }

    private _createShapeGroup():void {
        this.shapeGroup = EzElement.el('g').attr({class:'ez-shape-group'});
        this.svg.appendChild(this.shapeGroup);
    }

    private _createOverlayGroup():void {
        this.overlayGroup = EzElement.el('g').attr({class:'ez-overlay-group'});
        this.svg.appendChild(this.overlayGroup);
    }

    private _createState<T>(node:EzDiagramNode):T{
        let state;
        if(node instanceof EzVertex) {
            state = new EzVertexViewState(node, this);
        }else if(node instanceof EzEdge) {
            state = new EzEdgeViewState(node, this);
        }
        state.updateWork = STATE_WORK_TYPE.NEED_CREATE;
        state.scaleAndTranslate(this._scale, this._translate, new EzPoint(0, 0));
        state = state as T;
        if(state instanceof EzVertexViewState){
            state.bounds = this.ensureBoundsMeetsGridSize(state.bounds);
        }

        if(state instanceof EzEdgeViewState){
            state.points = state.points.map(pt=>this.ensurePointMeetsGrid(pt));
        }
        
        return state;
    }

    private _updateState(state:EzViewState) {
        state.style = state.node.style;
        state.scaleAndTranslate(this._scale, this._translate);
    }

    private _generateMarkerDefs(state:EzEdgeViewState):EzShapeStyle {
        const style = state.style;
        const stateId = state.id;
        const updatedStyle:EzShapeStyle = {};
        const genMarkerDef = (markerType, markerId) => {
            const marker = EzMarkerRegister.markers.get(markerType);
            const clonedEl = marker.markerNode.cloneNode(true) as Element;
            clonedEl.setAttribute('id', markerId);
            this.defs.appendChild(EzElement.el(clonedEl));
        };
        
        if(style.markerStart){
            const startType = style.markerStart;
            const markerId = `${startType}_${stateId}`;
            updatedStyle.markerStart = markerId;
            genMarkerDef(startType, markerId);
        }
        if(style.markerEnd){
            const endType = style.markerEnd;
            const markerId = `${endType}_${stateId}`;
            updatedStyle.markerEnd = markerId;

            if(markerId !== updatedStyle.markerStart) {
                genMarkerDef(endType, markerId);
            }
        }

        return {...getSvgStyle(style), ...updatedStyle};
    }

    private _translateState(state:EzViewState, distance:EzPoint, workType:STATE_WORK_TYPE):void{
        const moveState = (state:EzViewState):void=>{
            if(state instanceof EzVertexViewState){
                const alternate = state.clone();

                const bounds = EzRectangle.translate(state.getBounds(), distance);
                alternate.bounds = this.ensureBoundsMeetsGridSize(bounds);
                state.updateWork = workType;
                state.alternate = alternate;
                this.diagram.pluginManager.callHook(workType === STATE_WORK_TYPE.UPDATE_VIEW?'onMovingVertex':'onMoveVertex', state);
                if(state.children?.length){
                    moveChildren(state);
                }
            } else {
                const alternate = state.clone();
                alternate.translate(distance);
                alternate.points = alternate.points.map(pt=>this.ensurePointMeetsGrid(pt));
                state.updateWork = workType;
                state.alternate = alternate;
            }
        };

        const moveChildren = (state:EzVertexViewState)=>{
            state.children.forEach(childState=>{
                if(childState instanceof EzVertexViewState){
                    moveState(childState);
                } else {
                    // TODO  move edge
                }
            });
        };

        moveState(state);
    }

    private _rotateState(state:EzVertexViewState, deltaAngle:number, workType:STATE_WORK_TYPE):void {
        if(__DEV__){
            if(state.children?.length){
                console.error('rotation is only support vertex that does not have children.');
            }
        }
        const alternate = state.alternate || state.clone();
        const rotationAngle = (state.style.rotation || 0) + deltaAngle;
        const rotationStep = this.diagram.configManager.rotationStep;
        alternate.style.rotation = rotationAngle === 0 ? rotationAngle :Math.floor(rotationAngle/rotationStep) * rotationStep;
        state.updateWork = workType;
        state.alternate = alternate;
        this.diagram.pluginManager.callHook(workType===STATE_WORK_TYPE.UPDATE_VIEW?'onRotatingVertex':'onRotateVertex', state);
    }

    private _scaleState(state:EzVertexViewState, currentMousePoint:EzPoint, workType:STATE_WORK_TYPE, direction:Direction){
        currentMousePoint = this.ensurePointMeetsGrid(currentMousePoint);
        
        const scaleVertex = (state:EzVertexViewState):void=>{
            let centerPt:EzPoint;
            let width:number;
            let height:number;

            const originalBounds = state.getBounds();
            const originalRectPts = toRectPoints(originalBounds, state.style.rotation);
            const wVector = getVector(originalRectPts.TOP_LEFT, originalRectPts.TOP_RIGHT);
            const hVector = getVector(originalRectPts.TOP_LEFT, originalRectPts.BOTTOM_LEFT);
            const wUnitVector = getUnitVector(wVector);
            const hUnitVector = getUnitVector(hVector);

            // drag rectangle's four vertexes
            if([Direction.TOP_LEFT, Direction.TOP_RIGHT, Direction.BOTTOM_LEFT, Direction.BOTTOM_RIGHT].includes(direction)){


                switch(direction){
                case Direction.TOP_LEFT:
                    centerPt = new EzPoint((currentMousePoint.x+originalRectPts.BOTTOM_RIGHT.x)/2, (currentMousePoint.y+originalRectPts.BOTTOM_RIGHT.y)/2);
                    width = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_RIGHT), wVector);
                    height = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_RIGHT), hVector);
                    break;
                case Direction.TOP_RIGHT:
                    centerPt = new EzPoint((currentMousePoint.x+originalRectPts.BOTTOM_LEFT.x)/2, (currentMousePoint.y+originalRectPts.BOTTOM_LEFT.y)/2);
                    width = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_LEFT), wVector);
                    height = getVectorProjection(getVector(currentMousePoint, originalRectPts.BOTTOM_LEFT), hVector);
                    break;
                case Direction.BOTTOM_LEFT:
                    centerPt = new EzPoint((currentMousePoint.x+originalRectPts.TOP_RIGHT.x)/2, (currentMousePoint.y+originalRectPts.TOP_RIGHT.y)/2);
                    width = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_RIGHT), wVector);
                    height = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_RIGHT), hVector);
                    break;
                case Direction.BOTTOM_RIGHT:
                    centerPt = new EzPoint((currentMousePoint.x+originalRectPts.TOP_LEFT.x)/2, (currentMousePoint.y+originalRectPts.TOP_LEFT.y)/2);
                    width = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_LEFT), wVector);
                    height = getVectorProjection(getVector(currentMousePoint, originalRectPts.TOP_LEFT), hVector);
                    break;
                }
                           
            }
            // drag rectangle's four edges
            if([Direction.TOP, Direction.RIGHT, Direction.BOTTOM, Direction.LEFT].includes(direction)){
                let startPt:EzPoint;
                let projection:number;
                let movedVector:Vector;
                let endPoint:EzPoint;

                switch(direction) {
                case Direction.LEFT:
                    startPt = getCenterPoint(originalRectPts.BOTTOM_LEFT, originalRectPts.TOP_LEFT);
                    projection = getVectorProjection(getVector(startPt, currentMousePoint), wVector);
                    movedVector = getScalarMulOfVector(wUnitVector, getNormOfVector(wVector)-projection);
                    endPoint = getVectorEndPoint(getScalarMulOfVector(movedVector, -1), originalRectPts.TOP_RIGHT);

                    centerPt = new EzPoint((endPoint.x+originalRectPts.BOTTOM_RIGHT.x)/2, (endPoint.y+originalRectPts.BOTTOM_RIGHT.y)/2);
                    width = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), wVector);
                    height = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), hVector);
                    break;
                case Direction.TOP:
                    startPt = getCenterPoint(originalRectPts.TOP_LEFT, originalRectPts.TOP_RIGHT);
                    projection = getVectorProjection(getVector(startPt, currentMousePoint), hVector);
                    movedVector = getScalarMulOfVector(hUnitVector, getNormOfVector(hVector)-projection);
                    endPoint = getVectorEndPoint(getScalarMulOfVector(movedVector, -1), originalRectPts.BOTTOM_LEFT);

                    centerPt = new EzPoint((endPoint.x+originalRectPts.BOTTOM_RIGHT.x)/2, (endPoint.y+originalRectPts.BOTTOM_RIGHT.y)/2);
                    width = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), wVector);
                    height = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_RIGHT), hVector);
                    break;
                case Direction.RIGHT:
                    startPt = getCenterPoint(originalRectPts.TOP_RIGHT, originalRectPts.BOTTOM_RIGHT);
                    projection = getVectorProjection(getVector(startPt, currentMousePoint), wVector);
                    movedVector = getScalarMulOfVector(wUnitVector, getNormOfVector(wVector)+projection);
                    endPoint = getVectorEndPoint(movedVector, originalRectPts.TOP_LEFT);

                    centerPt = new EzPoint((endPoint.x+originalRectPts.BOTTOM_LEFT.x)/2, (endPoint.y+originalRectPts.BOTTOM_LEFT.y)/2);
                    width = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_LEFT), wVector);
                    height = getVectorProjection(getVector(endPoint, originalRectPts.BOTTOM_LEFT), hVector);
                    break;
                case Direction.BOTTOM:
                    startPt = getCenterPoint(originalRectPts.BOTTOM_LEFT, originalRectPts.BOTTOM_RIGHT);
                    projection = getVectorProjection(getVector(startPt, currentMousePoint), hVector);
                    movedVector = getScalarMulOfVector(hUnitVector, getNormOfVector(hVector)+projection);
                    endPoint = getVectorEndPoint(movedVector, originalRectPts.TOP_LEFT);

                    centerPt = new EzPoint((endPoint.x+originalRectPts.TOP_RIGHT.x)/2, (endPoint.y+originalRectPts.TOP_RIGHT.y)/2);
                    width = getVectorProjection(getVector(endPoint, originalRectPts.TOP_RIGHT), wVector);
                    height = getVectorProjection(getVector(endPoint, originalRectPts.TOP_RIGHT), hVector);
                    break;
                }
            }
            width = Math.abs(width);
            height = Math.abs(height);


            const nextBounds = new EzRectangle(centerPt.x-width/2, centerPt.y-height/2, width, height);  
            const alternate = state.alternate || state.clone();
            alternate.bounds = nextBounds;
            state.updateWork = workType;
            state.alternate = alternate;
            this.diagram.pluginManager.callHook(workType===STATE_WORK_TYPE.UPDATE_VIEW?'onResizingVertex':'onResizeVertex', state);
            if(state.children?.length){
                scaleChildren(state);
            }

        };


        const scaleChildren = (state:EzVertexViewState)=>{
            state.children.forEach(childState=>{
                if(childState instanceof EzVertexViewState){
                    scaleVertex(childState);
                } else {
                    // TODO  move edge
                }
            });
        };

        scaleVertex(state);
    }

    private _updateEdgePoint(state:EzEdgeViewState, nextPosition:EzPoint, index:number, update:boolean, workType:STATE_WORK_TYPE):void {
        const alternate = state.clone();

        nextPosition = this.ensurePointMeetsGrid(nextPosition);
        let points=state.points.map(pt=>pt.clone());
        // if nextPosition is not provided , delete point
        if(!nextPosition){ 
            points.splice(index, 1);
        }else if(update){
            points = state.points.map((p, i)=>{
                if(i===index){
                    return nextPosition.clone();
                }else {
                    return p.clone();
                }
            });
        }else {
            points.splice(index, 0, nextPosition.clone());
        }

        alternate.points = points;
        state.updateWork = workType;
        state.alternate = alternate;
    }

    private _updateModel(state:EzViewState):void {
        const scale = this.getScale();
        const translate = this.getTranslate();
        if(state instanceof EzVertexViewState) {
            const node = state.node;
            const stateBounds = state.getBounds();
            const bounds = new EzRectangle(stateBounds.x/scale-translate.x, stateBounds.y/scale-translate.y, stateBounds.width/scale, stateBounds.height/scale);
            node.bounds = bounds;
        }else if(state instanceof EzEdgeViewState) {
            const node = state.node;
            const statePoints = state.getPoints();
            const points = statePoints.map(point=>{
                return new EzPoint(point.x/scale-translate.x, point.y/scale-translate.y);
            });
            node.points = points;
        }
    }

    private _removeState(state:EzViewState):void {
        state.shape.destroy();
        if(state.node){
            if(state.node instanceof EzVertex){
                this.diagram.model.removeVertex(state.node);
            }else {
                this.diagram.model.removeEdge(state.node);
            }
            this.diagram.pluginManager.callHook('onRemoveState', state);
        }
        this.stateMapping.delete(state.node.id);
        this.states.splice(this.states.indexOf(state), 1);
    }

    /**
     * 
     * ensure bounds meets grid line
     * @param bounds 
     */
    public ensureBoundsMeetsGridSize(bounds:EzRectangle):EzRectangle {
        const gridSize = this.diagram.configManager.gridSize;
        bounds.x = Math.round(bounds.x/gridSize) * gridSize;
        bounds.y = Math.round(bounds.y/gridSize) * gridSize;
        bounds.width = Math.floor(bounds.width/gridSize) * gridSize;
        bounds.height = Math.floor(bounds.height/gridSize) * gridSize;
        return bounds;
    }

    /**
     * ensure point meets grid
     * @param point 
     * @returns 
     */
    public ensurePointMeetsGrid(point:EzPoint):EzPoint {
        const gridSize = this.diagram.configManager.gridSize;
        const pt = point.clone();
        pt.x = Math.floor(pt.x/gridSize) * gridSize;
        pt.y = Math.floor(pt.y/gridSize) * gridSize;
        return pt;
    }

    public movingVertex(state:EzVertexViewState, distance:EzPoint):void {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_VIEW);
    }

    public moveVertex(state:EzVertexViewState, distance:EzPoint):void {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    }


    public rotatingVertex(state:EzVertexViewState, deltaAngle:number):void {
        this._rotateState(state, deltaAngle, STATE_WORK_TYPE.UPDATE_VIEW);
    }

    public rotateVertex(state:EzVertexViewState, deltaAngle:number):void {
        this._rotateState(state, deltaAngle, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    }


    public resizingVertex(state:EzVertexViewState, currentMousePoint:EzPoint, direction:Direction):void {
        this._scaleState(state, currentMousePoint, STATE_WORK_TYPE.UPDATE_VIEW, direction);
    }

    public resizeVertex(state:EzVertexViewState, currentMousePoint:EzPoint, direction:Direction):void {
        this._scaleState(state, currentMousePoint, STATE_WORK_TYPE.UPDATE_TO_MODEL, direction);
    }

    public updateText(state:EzViewState, text:string):void {
        if(state instanceof EzVertexViewState){
            const node = state.node;
            node.text = text;
            state.updateWork = STATE_WORK_TYPE.UPDATE_TO_MODEL;
            // this.diagram.pluginManager.callEventHook()
        }
    }

    public movingEdge(state:EzEdgeViewState, distance:EzPoint):void {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_VIEW);
    }

    public moveEdge(state:EzEdgeViewState, distance:EzPoint):void {
        this._translateState(state, distance, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    }

    public changingEdgePoint(state:EzEdgeViewState, nextPosition:EzPoint, index:number, update = false):void {
        this._updateEdgePoint(state, nextPosition, index, update, STATE_WORK_TYPE.UPDATE_VIEW);
    }

    public changeEdgePoint(state:EzEdgeViewState, nextPosition:EzPoint, index:number, update = false):void {
        this._updateEdgePoint(state, nextPosition, index, update, STATE_WORK_TYPE.UPDATE_TO_MODEL);
    }

    /**
     * update or set related terminal vertex for edge
     * @param state 
     * @param terminal 
     * @param constraint - terminal constraint 
     * @param isSource - is source point of vertex
     */
    public updateTerminalVertex(state:EzEdgeViewState, terminal:EzVertex, constraint:EzConstraint, isSource = false):void {
        if(__DEV__){
            if(!(state instanceof EzEdgeViewState)){
                console.error(`EzDiagramView.updateTerminalVertex: invalid param , expect state instance of EzEdgeViewState , got ${Object.prototype.toString.call(state)}`);
            }
        }

        const model = this.diagram.model;
        model.updateTerminalVertex(state.node, terminal, constraint, isSource);
    }


    /**
     * commit changes to DOM
     * @param force force udpate all DOM elements
     * @returns 
     */
    public commit(): void{
        this._diagram.pluginManager.callHook('beforeViewUpdate', this._diagram);
        this.dirtyStates.forEach(state=>{
            const createShape = ()=>{
                const shapeCtor =this.shapeManager.getShape(state.style.shape);
                if(__DEV__){
                    if(!shapeCtor){
                        console.error(`no shape found for the given name: ${state.style.shape}`);
                    }
                }
                if(state instanceof EzVertexViewState){
                    state.shape = new shapeCtor(state);
                    state.shape.draw();
                }else {
                    const updatedStyle = this._generateMarkerDefs(state);
                    state.shape = new shapeCtor(state);
                    state.shape.setStyle(updatedStyle);
                    state.shape.draw();
                }
                const parentEl = this.shapeGroup;
                parentEl.appendChild(state.shape.root);
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
            };
            // first time to render dom
            if(state.updateWork===STATE_WORK_TYPE.NEED_CREATE){
                createShape();
            }
            if(state.updateWork === STATE_WORK_TYPE.UPDATE_VIEW){
                state.shape.redraw();
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
            }

            if(state.updateWork === STATE_WORK_TYPE.UPDATE_TO_MODEL){
                state.shape.redraw();
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
                Object.assign(state, state.alternate);
                state.alternate = null;
                this._updateModel(state);
            }

            if(state.updateWork === STATE_WORK_TYPE.UPDATE_FROM_MODEL){
                this._updateState(state);
                if(state.shape){
                    state.shape.redraw();
                }else {
                    createShape();
                }
                state.updateWork = STATE_WORK_TYPE.NO_WORK;
            }
        });
        if(this.dirtyStates.length){
            this._diagram.pluginManager.callHook('afterViewUpdate', this._diagram);
        }
        this.dirtyStates.length=0;
    }


    /**
     * add state for temporary usage
     * @param node 
     * @returns 
     */
    public addTempState(node:EzDiagramNode):EzViewState {
        const state = this._createState<EzViewState>(node);
        this.states.push(state);
        this.stateMapping.set(node.id, state);
        return state;
    }

    /**
     * remove temporary state
     * @param node 
     * @returns 
     */
    public removeTempState(state:EzViewState):void {
        return this._removeState(state);
    }

    /**
     * get current mouse point relative to view container
     * @param evt 
     */
    public getMousePointRelateToContainer(evt:MouseEvent):EzPoint {
        return new EzPoint(evt.pageX - this.size.left, evt.pageY - this.size.top);
    }

    public setZoomCenter(point:EzPoint):void{
        if(!point) return;
        this._scaleCenter = point;
    }

    public getZoomCenter():EzPoint {
        return this._scaleCenter;
    }

    /**
     * call event hook on a given state's shape
     * @param state 
     * @param hookName 
     * @param args 
     * @returns 
     */
    public callShapeEventHook(state:EzViewState, hookName:string, ...args):void {
        const shape = state.shape;
        if(!shape) return;

        const hookFn = shape[hookName];
        if(hookFn){
            hookFn.apply(shape, args);
        }
    }

    /**
     * remove view states from EzDiagramView
     * @param states 
     */
    public removeStates(states:EzViewState[]):void {
        states.forEach(state=>{
            this._removeState(state);
        });
    }

    /**
     * change z index oder for given node
     * @param node 
     * @param targetPosition
     *
     */
    public changeOrder(node:EzDiagramNode, targetPosition:number):void {
        const state = this.stateMapping.get(node.id);
        const siblings = state.parent.children;
        if(targetPosition<0) targetPosition = 0;
        if(targetPosition>siblings.length-1) targetPosition = siblings.length-1;
        const currentIndex = siblings.indexOf(state);
        const tmp = siblings[targetPosition];
        siblings[targetPosition] = state;
        siblings[currentIndex] = tmp;
        if(targetPosition>currentIndex){
            const sibling = tmp.shape.root.el.nextElementSibling;
            if(sibling){
                state.shape.root.insertBefore(EzElement.el(sibling));
            }else {
                state.shape.root.el.parentElement.appendChild(state.shape.root.el);
            }
        }else {
            state.shape.root.insertBefore(tmp.shape.root);
        }

        this.diagram.model.changeOrder(node, targetPosition);
    }


    /**
     * Getter diagram
     * @return {EzDiagram}
     */
    public get diagram(): EzDiagram {
        return this._diagram;
    }

    /**
     * Setter diagram
     * @param {EzDiagram} value
     */
    public set diagram(value: EzDiagram) {
        this._diagram = value;
    }
}