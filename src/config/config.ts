import { DEFAULT_STROKE_WIDTH } from '../view/style/style';
import {
    DEFAULT_EDGE_STROKE,
 DEFAULT_EDGE_STROKE_WIDTH,
 DEFAULT_GRID_SIZE, DEFAULT_ROTATION_STEP, DEFAULT_VERTEX_FILL_COLOR, DEFAULT_VERTEX_STROKE_COLOR 
} from './default-config';



export class EzConfigManager {

    /**
     * default style for vertex
     */
    static defaultVertexStyle = {
        fill:DEFAULT_VERTEX_FILL_COLOR, 
        stroke: DEFAULT_VERTEX_STROKE_COLOR,
        strokeWidth:DEFAULT_STROKE_WIDTH
    }
    

    /**
     * default style for edge   
     */    
    static defaultEdgeStyle = {stroke:DEFAULT_EDGE_STROKE,
        strokeWidth:DEFAULT_EDGE_STROKE_WIDTH};

    /**
     *  specify rotation angle step , the value should between 0 and 90
     */
    private _rotationStep:number = DEFAULT_ROTATION_STEP;

    /**
     *  when user move element or element handler's bend on a diagram.
     *  the shortest distance should be the _gridSize 
     */
    private _gridSize:number = DEFAULT_GRID_SIZE;
    
    /**
     *  specifiy whether the diagram should scale or translate using touch pad or mouse
     */
    private _shouldScaleAndTranslate = false;

    /**
     * Getter shouldScaleAndTranslate
     * @return {boolean}
     */
    public get shouldScaleAndTranslate(): boolean {
        return this._shouldScaleAndTranslate;
    }
    
    /**
    * Setter shouldScaleAndTranslate
    * @param {boolean} value
    */
    public set shouldScaleAndTranslate(value: boolean) {
        this._shouldScaleAndTranslate = value;
    }

    /**
     * Getter gridSize
     * @return {number}
     */
    public get gridSize(): number {
        return this._gridSize;
    }

    /**
     * Setter gridSize
     * @param {number} value
     */
    public set gridSize(value: number) {
        this._gridSize = value;
    }

    /**
     * Getter rotationStep
     * @return {number}
     */
    public get rotationStep(): number {
        return this._rotationStep;
    }

    /**
     * Setter rotationStep
     * @param {number} value
     */
    public set rotationStep(value: number) {
        this._rotationStep = value;
    }


}