import { EzEdgeStyleOptions } from '../../view/style/style';
import { EzPoint } from '../point';
import { EzVertex } from '..';
import { EzConstraint } from '../constraint/constraint';
import { EzDiagramNode } from '../diagram-node';
import { EzConfigManager } from '../../config/config';

export class EzEdge extends EzDiagramNode{

    private _points: EzPoint[];

    private _style:EzEdgeStyleOptions;

    private _source:EzVertex;

    private _target:EzVertex;

    private _sourceConstraint:EzConstraint;

    private _targetConstraint:EzConstraint;

    constructor(points:EzPoint[], style:EzEdgeStyleOptions, type?:string) {
        super(type);
        this._points = points;
        this._style = Object.assign({}, EzConfigManager.defaultEdgeStyle, style);
    }

    public setEndPoint(vertex:EzVertex, constraint:EzConstraint, isSource = false):void {
        vertex.edges.push(this);
        if(isSource){
            this._sourceConstraint = constraint;
            this._source = vertex;
        }else {
            this._targetConstraint = constraint;
            this._target = vertex;
        }
    }

    /**
     * Getter points
     * @return {EzPoint[]}
     */
    public get points(): EzPoint[] {
        return this._points;
    }

    /**
     * Setter points
     * @param {EzPoint[]} value
     */
    public set points(value: EzPoint[]) {
        this._points = value;
    }

    /**
     * Getter style
     * @return {EzEdgeStyleOptions}
     */
    public get style(): EzEdgeStyleOptions {
        return this._style;
    }

    /**
     * Setter style
     * @param {EzEdgeStyleOptions} value
     */
    public set style(value: EzEdgeStyleOptions) {
        this._style = value;
    }

    /**
     * Getter source
     * @return {EzVertex}
     */
    public get source(): EzVertex {
        return this._source;
    }

    /**
     * Setter source
     * @param {EzVertex} value
     */
    public set source(value: EzVertex) {
        this._source = value;
    }

    /**
     * Getter target
     * @return {EzVertex}
     */
    public get target(): EzVertex {
        return this._target;
    }

    /**
     * Setter target
     * @param {EzVertex} value
     */
    public set target(value: EzVertex) {
        this._target = value;
    }

    /**
     * Getter sourceConstraint
     * @return {EzConstraint}
     */
    public get sourceConstraint(): EzConstraint {
        return this._sourceConstraint;
    }
    
    /**
    * Setter sourceConstraint
    * @param {EzConstraint} value
    */
    public set sourceConstraint(value: EzConstraint) {
        this._sourceConstraint = value;
    }
    
    /**
    * Getter targetConstraint
    * @return {EzConstraint}
    */
    public get targetConstraint(): EzConstraint {
        return this._targetConstraint;
    }
    
    /**
    * Setter targetConstraint
    * @param {EzConstraint} value
    */
    public set targetConstraint(value: EzConstraint) {
        this._targetConstraint = value;
    }
}