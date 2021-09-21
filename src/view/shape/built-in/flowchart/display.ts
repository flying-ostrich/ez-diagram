import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class DisplayShape extends EzSimpleEditableVertexShape {

    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0, 0.5)
        .curveTo(0.082, 0.233, 0.224, 0.05, 0.388, 0)
        .lineTo(0.796, 0)
        .curveTo(0.918, 0.083, 1, 0.283, 1, 0.5)
        .curveTo(1, 0.7, 0.918, 0.9, 0.796, 1)
        .lineTo(0.388, 1)
        .curveTo(0.224, 0.933, 0.082, 0.75, 0, 0.5)
        .closePath();
    }
}

