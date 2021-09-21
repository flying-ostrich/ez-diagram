import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class PreparationShape extends EzSimpleEditableVertexShape {
   
    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0.206, 0.083)
        .curveTo(0.237, 0.017, 0.278, 0, 0.32, 0)
        .lineTo(0.67, 0)
        .curveTo(0.711, 0, 0.753, 0.017, 0.784, 0.083)
        .lineTo(0.99, 0.467)
        .curveTo(1, 0.483, 1, 0.5, 0.99, 0.533)
        .lineTo(0.784, 0.917)
        .curveTo(0.753, 0.967, 0.711, 0.983, 0.67, 1)
        .lineTo(0.32, 1)
        .curveTo(0.278, 0.983, 0.237, 0.967, 0.206, 0.917)
        .lineTo(0, 0.533)
        .curveTo(0, 0.5, 0, 0.483, 0, 0.467)
        .lineTo(0.206, 0.083)
        .closePath();
    }
}

