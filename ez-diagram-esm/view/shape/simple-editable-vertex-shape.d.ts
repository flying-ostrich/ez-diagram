import { EzElement } from '../canvas/ez-element';
import { EditableVertexShape } from './editable-vertex-shape';
export declare abstract class EzSimpleEditableVertexShape extends EditableVertexShape {
    shape: EzElement;
    abstract createShapeElement(): EzElement;
    abstract updateShape(): void;
    draw(): void;
    redraw(): void;
    updateStyle(): void;
}
