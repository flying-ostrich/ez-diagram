import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';
export declare class ManualOperationShape extends EzSimpleEditableVertexShape {
    createShapeElement(): EzElement;
    updateShape(): void;
}