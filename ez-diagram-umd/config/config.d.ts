export declare class EzConfigManager {
    /**
     * default style for vertex
     */
    static defaultVertexStyle: {
        fill: string;
        stroke: string;
        strokeWidth: number;
    };
    /**
     * default style for edge
     */
    static defaultEdgeStyle: {
        stroke: string;
        strokeWidth: number;
    };
    /**
     *  specify rotation angle step , the value should between 0 and 90
     */
    private _rotationStep;
    /**
     *  when user move element or element handler's bend on a diagram.
     *  the shortest distance should be the _gridSize
     */
    private _gridSize;
    /**
     *  specifiy whether the diagram should scale or translate using touch pad or mouse
     */
    private _shouldScaleAndTranslate;
    /**
     * Getter shouldScaleAndTranslate
     * @return {boolean}
     */
    get shouldScaleAndTranslate(): boolean;
    /**
    * Setter shouldScaleAndTranslate
    * @param {boolean} value
    */
    set shouldScaleAndTranslate(value: boolean);
    /**
     * Getter gridSize
     * @return {number}
     */
    get gridSize(): number;
    /**
     * Setter gridSize
     * @param {number} value
     */
    set gridSize(value: number);
    /**
     * Getter rotationStep
     * @return {number}
     */
    get rotationStep(): number;
    /**
     * Setter rotationStep
     * @param {number} value
     */
    set rotationStep(value: number);
}
