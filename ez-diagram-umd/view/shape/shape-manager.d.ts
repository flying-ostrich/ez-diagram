import { EzShapeConstructor } from './shape';
export declare const BUILTIN_SHAPE: {
    GRID_BACKGROUND: string;
    RECTANGLE: string;
    LINE: string;
    STICKER: string;
    ROUND_STICKER: string;
    FLOW_CHART: {
        TERMINAL: string;
        PROCESS: string;
        DECISION: string;
        INPUT_OUTPUT: string;
        PREDEFINED_PROCESS: string;
        ON_PAGE_CONNECTOR: string;
        OFF_PAGE_CONNECTOR: string;
        DELAY: string;
        ALTERNATE_PROCESS: string;
        DATA: string;
        DOCUMENT: string;
        MULTI_DOCUMENT: string;
        PREPARATION: string;
        DISPLAY: string;
        MANUAL_INPUT: string;
        MANUAL_OPERATION: string;
    };
    EDGE: {
        TREE_LINE: string;
    };
};
export declare class EzShapeManager {
    shapes: Map<string, EzShapeConstructor>;
    constructor();
    private registerBuiltInShapes;
    registerShape(shapeName: string, shape: EzShapeConstructor): void;
    getShape(shapeName: string): EzShapeConstructor;
}
