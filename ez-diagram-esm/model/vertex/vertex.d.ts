import { EzEdge } from '../edge/edge';
import { EzRectangle } from '../rectangle';
import { EzVertexStyleOptions } from '../../view/style/style';
import { EzConstraint } from '../constraint/constraint';
import { EzDiagramNode } from '../diagram-node';
import { EzDirection } from '../../constants';
export declare class EzVertex extends EzDiagramNode {
    private _bounds;
    private _style;
    private _constraints;
    private _edges;
    private _text;
    private _layout;
    private _layoutParent;
    private _layoutDirection;
    private _layoutChildren;
    constructor(bounds: EzRectangle, style: EzVertexStyleOptions, text?: string, layout?: string, type?: string);
    /**
     * remove edge which connected to current vertex
     * @param edge
     */
    removeEdge(edge: any): boolean;
    /**
     * Getter text
     * @return {string}
     */
    get text(): string;
    /**
     * Setter text
     * @param {string} value
     */
    set text(value: string);
    /**
     * Getter bounds
     * @return {EzRectangle}
     */
    get bounds(): EzRectangle;
    /**
     * Setter bounds
     * @param {EzRectangle} value
     */
    set bounds(value: EzRectangle);
    /**
     * Getter style
     * @return {EzVertexStyleOptions}
     */
    get style(): EzVertexStyleOptions;
    /**
     * Setter style
     * @param {EzVertexStyleOptions} value
     */
    set style(value: EzVertexStyleOptions);
    /**
     * Setter style
     * @param {EzVertexStyleOptions} value
     */
    /**
     * Getter edges
     * @return {EzEdge[]}
     */
    get edges(): EzEdge[];
    /**
     * Setter edges
     * @param {EzEdge[]} value
     */
    set edges(value: EzEdge[]);
    /**
     * Getter constraints
     * @return {EzConstraint[]}
     */
    get constraints(): EzConstraint[];
    /**
    * Setter constraints
    * @param {EzConstraint[]} value
    */
    set constraints(value: EzConstraint[]);
    /**
    * Getter layoutChildren
    * @return {EzVertex[]}
    */
    get layoutChildren(): EzVertex[];
    /**
    * Setter layoutChildren
    * @param {EzVertex[]} value
    */
    set layoutChildren(value: EzVertex[]);
    /**
     * Getter layoutParent
     * @return {EzVertex[]}
     */
    get layoutParent(): EzVertex;
    /**
    * Setter layoutParent
    * @param {EzVertex} value
    */
    set layoutParent(value: EzVertex);
    /**
     * Getter layout
     * @return {string}
     */
    get layout(): string;
    /**
    * Setter layout
    * @param {string} value
    */
    set layout(value: string);
    /**
     * Getter layoutDirection
     * @return {EzDirection}
     */
    get layoutDirection(): EzDirection;
    /**
    * Setter layoutDirection
    * @param {string} value
    */
    set layoutDirection(value: EzDirection);
}
