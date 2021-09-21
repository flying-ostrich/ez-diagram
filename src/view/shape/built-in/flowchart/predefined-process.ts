import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class PredefinedProcessShape extends EzSimpleEditableVertexShape {
   

    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0, 0)
        .lineTo(1, 0)
        .lineTo(1, 1)
        .lineTo(0, 1)
        .lineTo(0, 0)
        .moveTo(0.1, 0)
        .lineTo(0.1, 1)
        .moveTo(0.9, 0)
        .lineTo(0.9, 1)
        .closePath();
    }
}