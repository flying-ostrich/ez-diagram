import { COLOR_TRANSPARENT_WHITE } from '../../../constants';
import { EzElement } from '../../canvas/ez-element';
import { EzVertexViewState } from '../../view/view-state';
import { EzSimpleEditableVertexShape } from '../simple-editable-vertex-shape';

export class EzRectangleShape extends EzSimpleEditableVertexShape {

    constructor(state:EzVertexViewState){
        super(state);
    }

    createShapeElement():EzElement {
        return EzElement.el('rect');
    }

    updateShape():void {
        const state = this.state.alternate || this.state;
        const bounds = state.getBounds().plain();
        this.shape.attr({...bounds, fill:COLOR_TRANSPARENT_WHITE});
    }
}