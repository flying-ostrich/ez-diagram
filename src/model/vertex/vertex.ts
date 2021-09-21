import { EzEdge } from '../edge/edge';
import { EzRectangle } from '../rectangle';
import { EzVertexStyleOptions } from '../../view/style/style';
import { EZ_DIAGGRAM_DEFAULT_CONFIG } from '../../diagram/config';
import { EzConstraint } from '../constraint/constraint';
import { EzDiagramNode } from '../diagram-node';
import { EzConfigManager } from '../../config/config';
import { EzDirection } from '../../constants';

export class EzVertex extends EzDiagramNode{

    private _bounds:EzRectangle;

    private _style:EzVertexStyleOptions;

    private _constraints:EzConstraint[] = EZ_DIAGGRAM_DEFAULT_CONFIG.VERTEX_CONSTRAINTS;

    private _edges:EzEdge[] = [];

    private _text = '';

    private _layout:string;

    private _layoutParent:EzVertex;

    private _layoutDirection:EzDirection;

    private _layoutChildren:EzVertex [] = [];

    constructor(bounds:EzRectangle, style:EzVertexStyleOptions, text='', layout?:string, type?:string){
        super(type);
        this._style = Object.assign({}, EzConfigManager.defaultVertexStyle, style);
        this._bounds = bounds;
        this._text = text;
        if(layout){
            this.layout = layout;
        }
    }

    /**
     * remove edge which connected to current vertex
     * @param edge 
     */
    public removeEdge(edge):boolean {
        const edges = this._edges;
        const index = edges.indexOf(edge);
        if(index === -1){
            if(__DEV__){
                console.error('EzVertex:removeEdge no edge found!');
            }
            return false;
        }

        edges.splice(index, 1);
    }

    /**
     * Getter text
     * @return {string}
     */
    public get text(): string {
        return this._text;
    }

    /**
     * Setter text
     * @param {string} value
     */
    public set text(value: string) {
        this._text = value;
    }

    /**
     * Getter bounds
     * @return {EzRectangle}
     */
    public get bounds(): EzRectangle {
        return this._bounds;
    }

    /**
     * Setter bounds
     * @param {EzRectangle} value
     */
    public set bounds(value: EzRectangle) {
        this._bounds = value;
    }

    /**
     * Getter style
     * @return {EzVertexStyleOptions}
     */
    public get style(): EzVertexStyleOptions {
        return this._style;
    }


    /**
     * Setter style
     * @param {EzVertexStyleOptions} value
     */
    public set style(value: EzVertexStyleOptions) {
        this._style = value;
    }

    /**
     * Setter style
     * @param {EzVertexStyleOptions} value
     */

    /**
     * Getter edges
     * @return {EzEdge[]}
     */
    public get edges(): EzEdge[] {
        return this._edges;
    }

    /**
     * Setter edges
     * @param {EzEdge[]} value
     */
    public set edges(value: EzEdge[]) {
        this._edges = value;
    }

    /**
     * Getter constraints
     * @return {EzConstraint[]}
     */
    public get constraints(): EzConstraint[] {
        return this._constraints;
    }
    
    /**
    * Setter constraints
    * @param {EzConstraint[]} value
    */
    public set constraints(value: EzConstraint[]) {
        this._constraints = value;
    }

     /**
     * Getter layoutChildren
     * @return {EzVertex[]}
     */
    public get layoutChildren(): EzVertex[] {
        return this._layoutChildren;
    }
    
    /**
    * Setter layoutChildren
    * @param {EzVertex[]} value
    */
    public set layoutChildren(value: EzVertex[]) {
        this._layoutChildren = value;
    }

    /**
     * Getter layoutParent
     * @return {EzVertex[]}
     */
    public get layoutParent(): EzVertex {
        return this._layoutParent;
    }
        
    /**
    * Setter layoutParent
    * @param {EzVertex} value
    */
    public set layoutParent(value: EzVertex) {
        this._layoutParent = value;
    }

    /**
     * Getter layout
     * @return {string}
     */
    public get layout(): string {
        return this._layout;
    }
        
    /**
    * Setter layout
    * @param {string} value
    */
    public set layout(value: string) {
        this._layout = value;
    }


    /**
     * Getter layoutDirection
     * @return {EzDirection}
     */
    public get layoutDirection(): EzDirection {
        return this._layoutDirection;
    }
            
    /**
    * Setter layoutDirection
    * @param {string} value
    */
    public set layoutDirection(value: EzDirection) {
        this._layoutDirection = value;
    }
    
}