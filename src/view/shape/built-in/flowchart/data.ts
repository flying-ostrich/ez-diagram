import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class DataShape extends EzSimpleEditableVertexShape {

    createShapeElement():EzElement {
        return EzElement.el('path');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape
        ?.beginPath(true, state.getBounds())
        .moveTo(0.196, 0.084)
        .curveTo(0.208, 0.031, 0.227, 0, 0.247, 0.001)
        .lineTo(0.945, 0.001)
        .curveTo(0.961, 0.001, 0.977, 0.01, 0.987, 0.026)
        .lineTo( 0.997, 0.043)
        .curveTo(1, 0.064, 0.996, 0.084, 0.804, 0.916)
        .lineTo(0.792, 0.969)
        .curveTo(0.773, 1, 0.753, 0.999, 0.044, 0.999)
        .lineTo(0.03, 0.995)
        .curveTo(0.018, 0.985, 0.01, 0.969, 0.002, 0.953)
        .lineTo(0.004, 0.916)
        .lineTo(0.196, 0.084)
        .closePath();
    }
}