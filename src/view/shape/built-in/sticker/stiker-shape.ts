import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class StickerShape extends EzSimpleEditableVertexShape {
    static defaultColor = '#ffcf2f';

    createShapeElement():EzElement {
        return EzElement.el('rect');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        const bounds = state.getBounds().plain();
        this.shape.attr({...bounds});
    }

    updateStyle():void {
        super.updateStyle();
        this.shape.attr({strokeWidth:0}).style({filter:'drop-shadow(gray 1px 1px 2px)'});
    }
}