import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class InputOutputShape extends EzSimpleEditableVertexShape {
    

    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0.25, 0)
        .lineTo(1, 0)
        .lineTo(0.75, 1)
        .lineTo(0, 1)
        .lineTo(0.25, 0)
        .closePath();
    }
}