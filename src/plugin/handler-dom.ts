import { COLOR_TRANSPARENT_WHITE } from '../constants/color';
import { EzRectangle } from '../model';
import { EzElement } from '../view/canvas/ez-element';
import { EzViewState } from '../view/view/view-state';

export interface ResizeBend {
    [direction:number]:EzElement;
}

export enum Direction {
    TOP,
    LEFT,
    RIGHT,
    BOTTOM,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
}

export interface HandlerRects {
    rect:EzElement;
    transparent:EzElement;
}

export const BEND_SIZE = 5;
export const BEND_CLASS = 'bend';
export const SOURCE_BEND_CLASS = 'source-bend';
export const VIRTUAL_BEND_CLASS = 'virtual-bend';
export const TERMINAL_BEND_CLASS = 'terminal-bend';
export const HANDLER_CONTAINER_CLASS = 'handler-container';

export const getBend = ()=> EzElement.el('ellipse').asHandler().attr({
    rx:BEND_SIZE, ry:BEND_SIZE, fill:'white', stroke:'#d7d7d8', class:BEND_CLASS
});
export const getVirtualBend = ()=>EzElement.el('ellipse').asHandler().attr({
    rx:BEND_SIZE, ry:BEND_SIZE, fill:'#84a8ebe6', stroke:'#d7d7d8', class:VIRTUAL_BEND_CLASS
});

export const rotateHandleImg = 'data:image/svg+xml,%3Csvg viewBox=\'0 0 16 16\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\'%3E %3Cpath d=\'M12.3912347,0.817629762 L13.3201585,4.17991814 L9.92775351,5.06028113 L9.5648437,3.74713753 L10.6449102,3.46643754 C9.42413688,2.82130749 8.00003902,2.65790004 6.65758935,3.01795124 C5.19519461,3.4072743 4.03005981,4.34885886 3.3285111,5.55662172 C2.62712304,6.76410802 2.38915649,8.23763041 2.78082924,9.69095528 C3.17253996,11.1439344 4.12000262,12.3014777 5.33486562,12.9985533 C6.55019029,13.6958938 8.03314201,13.9324678 9.49571085,13.5429692 C10.6137545,13.2477979 11.5781765,12.6164418 12.2868512,11.7707691 C13.0260002,10.888731 13.4869338,9.77354808 13.5537768,8.56349595 L13.5537768,8.56349595 L14.9762304,8.67622825 C14.8845994,10.1866299 14.3056729,11.5780384 13.3818873,12.6804719 C12.4887835,13.7462902 11.2733479,14.5420101 9.86458935,14.9139512 C8.02169426,15.4045722 6.15325419,15.1065535 4.62214536,14.2279878 C3.09080913,13.3492916 1.89691924,11.8899232 1.4031713,10.0580468 C0.909274184,8.22612814 1.209206,6.36837862 2.09373695,4.84598612 C2.97785145,3.3243104 4.4460621,2.13765442 6.28921632,1.64710063 C7.99908526,1.18943811 9.81443957,1.40503907 11.3644489,2.24050621 L11.3644489,2.24050621 L11.0669155,1.16215767 L12.3912347,0.817629762 Z\' stroke=\'%23fff\' stroke-width=\'0.3\' fill=\'%23222325\'%3E %3C/path%3E %3C/svg%3E ';
export const getResizeBends = ():ResizeBend=>{
    return {
        [Direction.TOP]:getBend().style({cursor:'ns-resize'}).attr({direction:Direction.TOP}),
        [Direction.RIGHT]:getBend().style({cursor:'ew-resize'}).attr({direction:Direction.RIGHT}),
        [Direction.BOTTOM]:getBend().style({cursor:'ns-resize'}).attr({direction:Direction.BOTTOM}),
        [Direction.LEFT]:getBend().style({cursor:'ew-resize'}).attr({direction:Direction.LEFT}),
        [Direction.TOP_LEFT]:getBend().style({cursor:'nwse-resize'}).attr({direction:Direction.TOP_LEFT}),
        [Direction.TOP_RIGHT]:getBend().style({cursor:'nesw-resize'}).attr({direction:Direction.TOP_RIGHT}),
        [Direction.BOTTOM_LEFT]:getBend().style({cursor:'nesw-resize'}).attr({direction:Direction.BOTTOM_LEFT}),
        [Direction.BOTTOM_RIGHT]:getBend().style({cursor:'nwse-resize'}).attr({direction:Direction.BOTTOM_RIGHT}),
    };
};

export const getHandlerRects=(bounds:EzRectangle):HandlerRects=>{
    return {rect:EzElement.el('rect').asHandler().attr({...bounds.plain(), ...{
        stroke:'#4e9dec',
        strokeWidth:1,
        fill:COLOR_TRANSPARENT_WHITE
    }}),
        transparent:EzElement.el('rect').asHandler().attr(
            {...bounds.plain(), ...{
                stroke:COLOR_TRANSPARENT_WHITE,
                strokeWidth:3,
                fill:'none'
            }}
        ), };
};

export const getRotationHandler = ()=>{
    const image = EzElement.el('image').asHandler();
    image.el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', rotateHandleImg);
    return image.style({cursor:'pointer'}).attr({class:'rotation-handler'});
};

export const getHandlerContainer = (state:EzViewState):EzElement => {
    return EzElement.el('g').attr({class:HANDLER_CONTAINER_CLASS, dataId:state.node.id});
};