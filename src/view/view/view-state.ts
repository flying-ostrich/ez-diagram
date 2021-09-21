import { v4 } from 'uuid';
import { EzDiagramView } from '..';
import { EzEdge, EzVertex } from '../../model';
import { EzPoint } from '../../model/point';
import { EzRectangle } from '../../model/rectangle';
import {getBoundingBoxFromPoints, toRectPoints} from '../../utils/math';
import { EzShape } from '../shape';
import {
DEFAULT_STROKE_WIDTH, EzEdgeStyleOptions, EzVertexStyleOptions
} from '../style/style';

export enum STATE_WORK_TYPE {
    NO_WORK,
    REMOVE,
    NEED_CREATE,
    UPDATE_FROM_MODEL,
    UPDATE_TO_MODEL,
    UPDATE_VIEW
}

export class EzState {
    id:string;

    shape:EzShape;

    parent:EzVertexViewState;

    view:EzDiagramView;

    _updateWork:STATE_WORK_TYPE = STATE_WORK_TYPE.NEED_CREATE;

    constructor(view:EzDiagramView){
        this.view = view;
        this.id = v4();
    }

    public scalePoints(scale:number, points:EzPoint[], translate:EzPoint):EzPoint[] {
        return points.map(point=>{
            return new EzPoint((point.x+translate.x)*scale, (point.y+translate.y)*scale);
        });
    }

    public set updateWork(value:STATE_WORK_TYPE) {
        if(!this.shape){
            value = STATE_WORK_TYPE.NEED_CREATE;
        }
        if(value !==STATE_WORK_TYPE.NO_WORK){
            if(this.view.dirtyStates.indexOf(this as any) ===-1){
                this.view.dirtyStates.push(this as any);
            }
        }
        this._updateWork = value;
    }

    public get updateWork():STATE_WORK_TYPE {
        return this._updateWork;
    }
}

export class EzVertexViewState extends EzState {
    bounds:EzRectangle;

    style:EzVertexStyleOptions;

    children:EzViewState[];

    alternate:EzVertexViewState;

    node:EzVertex;

    constructor(vertex:EzVertex, view:EzDiagramView){
        super(view);
        this.node = vertex;
        this.bounds = vertex.bounds.clone();
        this.style =Object.assign({}, vertex.style);
    }

    translate(delta:EzPoint):void {
        this.bounds = EzRectangle.translate(this.bounds, delta);
    }

    scaleAndTranslate(scale:number, translate:EzPoint):void {
        const points = toRectPoints(this.node.bounds);
        const scaled = this.scalePoints(scale, [points.TOP_LEFT, points.TOP_RIGHT, points.BOTTOM_LEFT, points.BOTTOM_RIGHT], translate);
        this.bounds = getBoundingBoxFromPoints(scaled);
    }

    getBounds():EzRectangle {
        return this.bounds;
    }

    clone():EzVertexViewState {
        const state = new EzVertexViewState(this.node, this.view);
        state.id = this.id;
        state.bounds = this.bounds.clone();
        state.style = Object.assign({}, this.style);
        return state;
    }
}

export class EzEdgeViewState extends EzState {
    points:EzPoint[];

    style:EzEdgeStyleOptions;

    alternate:EzEdgeViewState;

    node:EzEdge;

    constructor(edge:EzEdge, view:EzDiagramView){
        super(view);
        this.node = edge;
        this.points = edge.points.map(pt=>pt.clone());
        this.style = Object.assign({}, edge.style);
    }

    translate(translate:EzPoint):void {
        this.points=this.points.map(pt=>pt.translate(translate));
    }

    scaleAndTranslate(scale:number, translate:EzPoint):void {
        const points = this.node.points;
        this.style.strokeWidth = (this.style.strokeWidth || DEFAULT_STROKE_WIDTH) * scale;
        this.points = this.scalePoints(scale, points, translate);
    }

    getBounds():EzRectangle {
        return getBoundingBoxFromPoints(this.points);
    }

    getPoints():EzPoint[] {
        return this.points;
    }

    clone():EzEdgeViewState {
        const state = new EzEdgeViewState(this.node, this.view);
        state.id = this.id;
        state.points = this.points.map(pt=>pt.clone());
        state.style = Object.assign({}, this.style);
        return state;
    }
}

export type EzViewState= EzEdgeViewState | EzVertexViewState;