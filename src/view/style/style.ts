declare type SVG_POINTER_EVENTS = 'bounding-box' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all' | 'none';

export const DEFAULT_STROKE_WIDTH = 1;

/** mouse action area is based on shape's real size with expanding tolerence */
export const DEFAULT_MOUSE_ACTION_TOLERENCE = 4;

export interface EzVertexStyleOptions {
    shape?:string;
    rotation:number;
    editable?:boolean;
    movable?:boolean;
    selectable?:boolean;

    fill?:string;
    stroke?:string;
    strokeWidth?:number;
    strokeDasharray?:number[];
    pointerEvents?:SVG_POINTER_EVENTS;

    /**font styles */
    color:string; // font color
    fontSize:string; // font size

}

export interface EzEdgeStyleOptions {
    shape?:string;
    markerStart?:string;
    markerEnd?:string;
    direction?: 'vertical' | 'horizontal';
    selectable?:boolean;
    editable?:boolean;


    fill?:string;
    stroke?:string;
    strokeWidth?:number;
    strokeDasharray?:number[];
    pointerEvents?:SVG_POINTER_EVENTS;
}

export declare type EzStyleOptions = EzVertexStyleOptions | EzEdgeStyleOptions;

export function getSvgStyle(style:EzStyleOptions):{[key:string]:string}{
    const svgStyle = {};
    Object.keys(style).forEach(key=>{
        if(typeof(style[key])==='string'|| typeof(style[key])==='number') {
            svgStyle[key] = style[key];      
        }
    });
    return svgStyle;
}

export function getFontStyles(style:EzStyleOptions){
    const fontStyleAttributes = ['fontSize', 'color'];
    const result = {};
    Object.keys(style).forEach(key=>{
        if(fontStyleAttributes.some(attrKey=>attrKey === key)){
            result[key] = style[key];
        }
    });
    return result;
}

