import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class OffPageConnectorShape extends EzSimpleEditableVertexShape {
    

    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        const bounds = state.getBounds();
        this.shape
        ?.beginPath(true, bounds)
        .moveTo(0, 0.05)
        .curveTo(0, 0, 0, 0, 0.05, 0)
        .lineTo(0.95, 0)
        .curveTo(1, 0, 1, 0, 1, 0.05)
        .lineTo(1, 0.5)
        .lineTo(0.5, 1)
        .lineTo(0, 0.5)
        .lineTo(0, 0.05)
        .closePath();
    }
}