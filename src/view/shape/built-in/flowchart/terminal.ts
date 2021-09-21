import { COLOR_TRANSPARENT_WHITE } from '../../../../constants';
import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class TerminalShape extends EzSimpleEditableVertexShape {
    
    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0.2, 0)
        .curveTo(-0.05, 0, -0.05, 1, 0.2, 1)
        .lineTo(0.8, 1)
        .curveTo(1.05, 1, 1.05, 0, 0.8, 0)
        .lineTo(0.2, 0)
        .closePath();
    }
}