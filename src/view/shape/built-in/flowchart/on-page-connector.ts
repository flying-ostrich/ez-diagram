import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class OnPageConnectorShape extends EzSimpleEditableVertexShape {
    
    createShapeElement():EzElement {
        return EzElement.el('ellipse');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        const bounds = state.getBounds().plain();
        const radius = Math.min(bounds.width, bounds.height) /2;
        this.shape.attr({
            rx:radius, ry:radius, cx:bounds.x+bounds.width/2, cy:bounds.y+bounds.height/2
        });
    }
}