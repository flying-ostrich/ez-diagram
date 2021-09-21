import { EzElement } from '../canvas/ez-element';
import { EzViewState } from '../view/view-state';

export type EzShapeConstructor = new(state:EzViewState)=>EzShape;
export type EzShapeStyle = {[key:string]:string|number};
export abstract class EzShape {
    root = EzElement.el('g');

    style:EzShapeStyle;

    setStyle(style:EzShapeStyle){
        this.style = style;
    }

    destroy():void {
        this.onDestroy();
        this.root.remove();
    }

    /**
     * life cycle hook , invoke before shape destroy
     */
    onDestroy():void {}

    /**
     *  init svg elements and append to root of the shape 
     */
    abstract draw():void;

    /**
     *  update svg elements
     */
    abstract redraw():void;

    /**
     *  apply style to DOM element
     */
    abstract updateStyle():void;
}

