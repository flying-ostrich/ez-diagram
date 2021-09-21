import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class DecisionShape extends EzSimpleEditableVertexShape {

    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0, 0.5)
        .lineTo(0.5, 0)
        .lineTo(1, 0.5)
        .lineTo(0.5, 1)
        .lineTo(0, 0.5)
        .closePath();
    }
}