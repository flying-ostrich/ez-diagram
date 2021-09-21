import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class ManualInputShape extends EzSimpleEditableVertexShape {
   
    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0, 0.417)
        .lineTo(0.939, 0)
        .curveTo(0.969, 0, 0.99, 0.033, 0.99, 0.083)
        .lineTo(0.99, 0.917)
        .curveTo(1, 0.95, 0.98, 0.983, 0.949, 1)
        .lineTo(0.051, 1)
        .curveTo(0.02, 1, 0, 0.95, 0, 0.917)
        .lineTo(0, 0.417)
        .closePath();
    }
}



