import { EzElement } from '../../canvas/ez-element';
import { EzVertexViewState } from '../../view/view-state';
import { EzSimpleEditableVertexShape } from '../simple-editable-vertex-shape';
export declare class EzRectangleShape extends EzSimpleEditableVertexShape {
    constructor(state: EzVertexViewState);
    createShapeElement(): EzElement;
    updateShape(): void;
}
