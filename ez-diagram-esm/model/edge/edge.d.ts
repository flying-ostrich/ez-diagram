import { EzEdgeStyleOptions } from '../../view/style/style';
import { EzPoint } from '../point';
import { EzVertex } from '..';
import { EzConstraint } from '../constraint/constraint';
import { EzDiagramNode } from '../diagram-node';
export declare class EzEdge extends EzDiagramNode {
    private _points;
    private _style;
    private _source;
    private _target;
    private _sourceConstraint;
    private _targetConstraint;
    constructor(points: EzPoint[], style: EzEdgeStyleOptions, type?: string);
    setEndPoint(vertex: EzVertex, constraint: EzConstraint, isSource?: boolean): void;
    /**
     * Getter points
     * @return {EzPoint[]}
     */
    get points(): EzPoint[];
    /**
     * Setter points
     * @param {EzPoint[]} value
     */
    set points(value: EzPoint[]);
    /**
     * Getter style
     * @return {EzEdgeStyleOptions}
     */
    get style(): EzEdgeStyleOptions;
    /**
     * Setter style
     * @param {EzEdgeStyleOptions} value
     */
    set style(value: EzEdgeStyleOptions);
    /**
     * Getter source
     * @return {EzVertex}
     */
    get source(): EzVertex;
    /**
     * Setter source
     * @param {EzVertex} value
     */
    set source(value: EzVertex);
    /**
     * Getter target
     * @return {EzVertex}
     */
    get target(): EzVertex;
    /**
     * Setter target
     * @param {EzVertex} value
     */
    set target(value: EzVertex);
    /**
     * Getter sourceConstraint
     * @return {EzConstraint}
     */
    get sourceConstraint(): EzConstraint;
    /**
    * Setter sourceConstraint
    * @param {EzConstraint} value
    */
    set sourceConstraint(value: EzConstraint);
    /**
    * Getter targetConstraint
    * @return {EzConstraint}
    */
    get targetConstraint(): EzConstraint;
    /**
    * Setter targetConstraint
    * @param {EzConstraint} value
    */
    set targetConstraint(value: EzConstraint);
}
