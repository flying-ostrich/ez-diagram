import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class DocumentShape extends EzSimpleEditableVertexShape {
   
    
    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0, 0.067)
        .curveTo(0, 0.05, 0, 0.033, 0.01, 0.017)
        .curveTo(0.02, 0, 0.031, 0, 0.051, 0)
        .lineTo(0.949, 0)
        .curveTo(0.959, 0, 0.969, 0, 0.98, 0.017)
        .curveTo(0.99, 0.033, 1, 0.05, 1, 0.067)
        .lineTo(1, 0.9)
        .curveTo(0.837, 0.8, 0.653, 0.8, 0.5, 0.9)
        .curveTo(0.337, 1, 0.153, 1, 0, 0.9)
        .closePath();
    }
}