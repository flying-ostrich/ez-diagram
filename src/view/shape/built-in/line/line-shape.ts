import { EzElement } from '../../../canvas/ez-element';
import { DEFAULT_MOUSE_ACTION_TOLERENCE } from '../../../style/style';
import {EzEdgeViewState} from '../../../view/view-state';
import { EzEdgeShape } from '../../edge-shape';
import { EzShapeStyle } from '../../shape';
/**
 *  EzLineShape is a kind of edge shape , which points are all connected with straight line
 */
export class EzLineShape extends EzEdgeShape {
    line:EzElement;

    transparentLine:EzElement;

    constructor(state:EzEdgeViewState){
        super(state);
    }

    draw():void {
        const state = this.state as EzEdgeViewState;
        const markerStyle:EzShapeStyle = {};
        const points = state.points;
        if(this.style.markerStart) {
            markerStyle.markerStart = `url(#${this.style.markerStart})`;
        }
        if(this.style.markerEnd){
            markerStyle.markerEnd = `url(#${this.style.markerEnd})`;
        }

        this.style.fill = 'none';
        this.setStyle({
            ...this.style, ...markerStyle, fill:'none'
        });
        this.line = EzElement.line(points).attr(this.style);
        this.transparentLine = this.line.clone()
            .attr({strokeWidth:+this.style.strokeWidth+DEFAULT_MOUSE_ACTION_TOLERENCE, stroke:'transparent'})
            .removeAttr('markerStart')
            .removeAttr('markerEnd');
        this.root.appendChildren([this.line, this.transparentLine]);
    }

    redraw():void {
        const state = (this.state.alternate || this.state) as EzEdgeViewState;
        this.line.line(state.points);
        this.transparentLine.line(state.points);
    }
}