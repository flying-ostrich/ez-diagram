import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class RoundStickerShape extends EzSimpleEditableVertexShape {
    static defaultColor = '#ffcf2f';

    createShapeElement():EzElement {
        return EzElement.el('ellipse');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        const bounds = state.getBounds();
        const radius = Math.min(bounds.width, bounds.height)/2;
        this.shape.attr({
            cx:bounds.center().x,
            cy:bounds.center().y,
            rx:radius,
            ry:radius
        });
    }

    updateStyle():void {
        super.updateStyle();
        this.shape.attr({strokeWidth:0}).style({filter:'drop-shadow(gray 1px 1px 2px)'});
    }
}