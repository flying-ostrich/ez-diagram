import { EzDiagram } from '../../diagram/diagram';
import { EzRectangle, EzVertex } from '../../model';
import { EzConstraint } from '../../model/constraint/constraint';
import { EzDiagramNode } from '../../model/diagram-node';
import { EzPoint } from '../../model/point';
import { Direction } from '../../plugin/handler-dom';
import { EzElement } from '../canvas/ez-element';
import { EzShapeManager } from '../shape/shape-manager';
import { EzEdgeViewState, EzVertexViewState, EzViewState } from './view-state';
export declare class EzDiagramView {
    private _diagram;
    private _translate;
    private _scaleCenter;
    private _scale;
    svg: EzElement;
    defs: EzElement;
    shapeGroup: EzElement;
    overlayGroup: EzElement;
    stateMapping: Map<string, EzViewState>;
    shapeManager: EzShapeManager;
    states: EzViewState[];
    dirtyStates: EzViewState[];
    size: DOMRect;
    constructor(diagram: EzDiagram);
    private _init;
    private _startCommitLoop;
    getScale(): number;
    setScale(scale: number): void;
    translate(offset: EzPoint): void;
    setTranslate(translate: EzPoint): void;
    getTranslate(): EzPoint;
    rerender(): EzElement;
    render(): EzElement;
    getState(el: Element): EzViewState;
    private _createEventSystem;
    private _createSvg;
    private _createDefs;
    private _createShapeGroup;
    private _createOverlayGroup;
    private _createState;
    private _updateState;
    private _generateMarkerDefs;
    private _translateState;
    private _rotateState;
    private _scaleState;
    private _updateEdgePoint;
    private _updateModel;
    private _removeState;
    /**
     *
     * ensure bounds meets grid line
     * @param bounds
     */
    ensureBoundsMeetsGridSize(bounds: EzRectangle): EzRectangle;
    /**
     * ensure point meets grid
     * @param point
     * @returns
     */
    ensurePointMeetsGrid(point: EzPoint): EzPoint;
    movingVertex(state: EzVertexViewState, distance: EzPoint): void;
    moveVertex(state: EzVertexViewState, distance: EzPoint): void;
    rotatingVertex(state: EzVertexViewState, deltaAngle: number): void;
    rotateVertex(state: EzVertexViewState, deltaAngle: number): void;
    resizingVertex(state: EzVertexViewState, currentMousePoint: EzPoint, direction: Direction): void;
    resizeVertex(state: EzVertexViewState, currentMousePoint: EzPoint, direction: Direction): void;
    updateText(state: EzViewState, text: string): void;
    movingEdge(state: EzEdgeViewState, distance: EzPoint): void;
    moveEdge(state: EzEdgeViewState, distance: EzPoint): void;
    changingEdgePoint(state: EzEdgeViewState, nextPosition: EzPoint, index: number, update?: boolean): void;
    changeEdgePoint(state: EzEdgeViewState, nextPosition: EzPoint, index: number, update?: boolean): void;
    /**
     * update or set related terminal vertex for edge
     * @param state
     * @param terminal
     * @param constraint - terminal constraint
     * @param isSource - is source point of vertex
     */
    updateTerminalVertex(state: EzEdgeViewState, terminal: EzVertex, constraint: EzConstraint, isSource?: boolean): void;
    /**
     * commit changes to DOM
     * @param force force udpate all DOM elements
     * @returns
     */
    commit(): void;
    markAllDirty(): void;
    /**
     * add state for temporary usage
     * @param node
     * @returns
     */
    addTempState(node: EzDiagramNode): EzViewState;
    /**
     * remove temporary state
     * @param node
     * @returns
     */
    removeTempState(state: EzViewState): void;
    /**
     * get current mouse point relative to view container
     * @param evt
     */
    getMousePointRelateToContainer(evt: MouseEvent): EzPoint;
    setZoomCenter(point: EzPoint): void;
    getZoomCenter(): EzPoint;
    /**
     * call event hook on a given state's shape
     * @param state
     * @param hookName
     * @param args
     * @returns
     */
    callShapeEventHook(state: EzViewState, hookName: string, ...args: any[]): void;
    /**
     * remove view states from EzDiagramView
     * @param states
     */
    removeStates(states: EzViewState[]): void;
    /**
     * change z index oder for given node
     * @param node
     * @param targetPosition
     *
     */
    changeOrder(node: EzDiagramNode, targetPosition: number): void;
    /**
     * Getter diagram
     * @return {EzDiagram}
     */
    get diagram(): EzDiagram;
    /**
     * Setter diagram
     * @param {EzDiagram} value
     */
    set diagram(value: EzDiagram);
}
