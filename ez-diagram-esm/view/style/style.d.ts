declare type SVG_POINTER_EVENTS = 'bounding-box' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | 'none';
export declare const DEFAULT_STROKE_WIDTH = 1;
/** mouse action area is based on shape's real size with expanding tolerence */
export declare const DEFAULT_MOUSE_ACTION_TOLERENCE = 4;
export interface EzVertexStyleOptions {
    shape?: string;
    rotation?: number;
    editable?: boolean;
    movable?: boolean;
    selectable?: boolean;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: number[];
    pointerEvents?: SVG_POINTER_EVENTS;
    /**font styles */
    color?: string;
    fontSize?: string;
}
export interface EzEdgeStyleOptions {
    shape?: string;
    markerStart?: string;
    markerEnd?: string;
    direction?: 'vertical' | 'horizontal';
    selectable?: boolean;
    editable?: boolean;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: number[];
    pointerEvents?: SVG_POINTER_EVENTS;
}
export declare type EzStyleOptions = EzVertexStyleOptions | EzEdgeStyleOptions;
export declare function getSvgStyle(style: EzStyleOptions): {
    [key: string]: string;
};
export declare function getFontStyles(style: EzStyleOptions): {};
export {};
