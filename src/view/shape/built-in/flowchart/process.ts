import { EzElement } from '../../../canvas/ez-element';
import { EzSimpleEditableVertexShape } from '../../simple-editable-vertex-shape';

export class ProcessShape extends EzSimpleEditableVertexShape {
    
    createShapeElement():EzElement {
        return EzElement.el('rect');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        this.shape.attr(state.getBounds().plain());
    }
}