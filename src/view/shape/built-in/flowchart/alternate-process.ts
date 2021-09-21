import { COLOR_WHITE } from '../../../../constants';
import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class AlternateProcessShape extends EzSimpleEditableVertexShape {

    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0, 0.05)
        .curveTo(0, 0, 0, 0, 0.05, 0)
        .lineTo(0.95, 0)
        .curveTo(1, 0, 1, 0, 1, 0.05)
        .lineTo(1, 0.95)
        .curveTo(1, 1, 1, 1, 0.95, 1)
        .lineTo(0.05, 1)
        .curveTo(0, 1, 0, 1, 0, 0.95)
        .lineTo(0, 0.05)
        .closePath();
    }
}