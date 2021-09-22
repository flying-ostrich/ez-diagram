import { EzDiagramView } from '..';
import { EzEdge, EzVertex } from '../../model';
import { EzPoint } from '../../model/point';
import { EzRectangle } from '../../model/rectangle';
import { EzShape } from '../shape';
import { EzEdgeStyleOptions, EzVertexStyleOptions } from '../style/style';
export declare enum STATE_WORK_TYPE {
    NO_WORK = 0,
    REMOVE = 1,
    NEED_CREATE = 2,
    UPDATE_FROM_MODEL = 3,
    UPDATE_TO_MODEL = 4,
    UPDATE_VIEW = 5
}
export declare class EzState {
    id: string;
    shape: EzShape;
    parent: EzVertexViewState;
    view: EzDiagramView;
    _updateWork: STATE_WORK_TYPE;
    constructor(view: EzDiagramView);
    scalePoints(scale: number, points: EzPoint[], translate: EzPoint): EzPoint[];
    set updateWork(value: STATE_WORK_TYPE);
    get updateWork(): STATE_WORK_TYPE;
}
export declare class EzVertexViewState extends EzState {
    bounds: EzRectangle;
    style: EzVertexStyleOptions;
    children: EzViewState[];
    alternate: EzVertexViewState;
    node: EzVertex;
    constructor(vertex: EzVertex, view: EzDiagramView);
    translate(delta: EzPoint): void;
    scaleAndTranslate(scale: number, translate: EzPoint): void;
    getBounds(): EzRectangle;
    clone(): EzVertexViewState;
}
export declare class EzEdgeViewState extends EzState {
    points: EzPoint[];
    style: EzEdgeStyleOptions;
    alternate: EzEdgeViewState;
    node: EzEdge;
    constructor(edge: EzEdge, view: EzDiagramView);
    translate(translate: EzPoint): void;
    scaleAndTranslate(scale: number, translate: EzPoint): void;
    getBounds(): EzRectangle;
    getPoints(): EzPoint[];
    clone(): EzEdgeViewState;
}
export declare type EzViewState = EzEdgeViewState | EzVertexViewState;
