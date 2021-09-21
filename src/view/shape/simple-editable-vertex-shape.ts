import { EzElement } from '../canvas/ez-element';
import { EditableVertexShape } from './editable-vertex-shape';

export abstract class EzSimpleEditableVertexShape extends EditableVertexShape {
    shape:EzElement;

    abstract createShapeElement():EzElement;

    abstract updateShape():void;

    draw():void {
        super.draw();
        this.shape = this.createShapeElement();
        this.updateShape();
        this.updateStyle();
        this.root.prependChild(this.shape);
    }

    redraw():void {
        super.redraw();
        this.updateShape();
        this.updateStyle();
    }

    updateStyle():void{
        this.shape?.attr(this.style);
    }
}