import { COLOR_WHITE } from '../../../../constants';
import { EzElement } from '../../../canvas/ez-element';
import { EditableVertexShape } from '../../editable-vertex-shape';

export class MultiDocumentShape extends EditableVertexShape {
    shape1:EzElement;

    shape2:EzElement;

    shape3:EzElement;

    draw():void {
        super.draw();

        this.shape1 = EzElement.el('path').attr({fill:COLOR_WHITE, stroke:'black'});
        this.shape2 = this.shape1.clone();
        this.shape3 = this.shape1.clone();
        this._drawShape();
            
        this.root.prependChild(this.shape3);
        this.root.prependChild(this.shape2);
        this.root.prependChild(this.shape1);
    }

    redraw():void {
        super.redraw();
        this._drawShape();
    }

    private _drawShape():void {
        const state = this.state.alternate || this.state;
        const bounds1 = state.getBounds().clone();
        bounds1.width -= bounds1.width * 0.09;
        bounds1.height -= bounds1.height * 0.12;
        bounds1.x += bounds1.width * 0.09;
        this.shape1
        ?.beginPath(true, bounds1)
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

        const bounds2 = state.getBounds().clone();
        bounds2.width -= bounds2.width * 0.09;
        bounds2.height -= bounds2.height * 0.12;
        bounds2.x += bounds2.width * 0.045;
        bounds2.y += bounds2.height * 0.06;
        this.shape2
        ?.beginPath(true, bounds2)
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


        const bounds3 = state.getBounds().clone();
        bounds3.width -= bounds3.width * 0.09;
        bounds3.height -= bounds3.height * 0.12;
        bounds3.y += bounds3.height * 0.12;
        this.shape3
        ?.beginPath(true, bounds3)
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

        this.shape1.attr(this.style);
        this.shape2.attr(this.style);
        this.shape3.attr(this.style);
    }
}