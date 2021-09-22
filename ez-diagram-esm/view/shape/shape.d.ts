import { EzElement } from '../canvas/ez-element';
import { EzViewState } from '../view/view-state';
export declare type EzShapeConstructor = new (state: EzViewState) => EzShape;
export declare type EzShapeStyle = {
    [key: string]: string | number;
};
export declare abstract class EzShape {
    root: EzElement;
    style: EzShapeStyle;
    setStyle(style: EzShapeStyle): void;
    destroy(): void;
    /**
     * life cycle hook , invoke before shape destroy
     */
    onDestroy(): void;
    /**
     *  init svg elements and append to root of the shape
     */
    abstract draw(): void;
    /**
     *  update svg elements
     */
    abstract redraw(): void;
    /**
     *  apply style to DOM element
     */
    abstract updateStyle(): void;
}
