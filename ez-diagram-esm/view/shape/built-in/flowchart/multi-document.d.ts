import { EzElement } from '../../../canvas/ez-element';
import { EditableVertexShape } from '../../editable-vertex-shape';
export declare class MultiDocumentShape extends EditableVertexShape {
    shape1: EzElement;
    shape2: EzElement;
    shape3: EzElement;
    draw(): void;
    redraw(): void;
    private _drawShape;
}
