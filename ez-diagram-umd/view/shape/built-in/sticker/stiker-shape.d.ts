import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';
export declare class StickerShape extends EzSimpleEditableVertexShape {
    static defaultColor: string;
    createShapeElement(): EzElement;
    updateShape(): void;
    updateStyle(): void;
}
