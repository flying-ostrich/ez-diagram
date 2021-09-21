import { EzPoint } from '../../../../model';
import { EzElement } from '../../../canvas/ez-element';
import { DEFAULT_MOUSE_ACTION_TOLERENCE } from '../../../style/style';
import {EzEdgeViewState} from '../../../view/view-state';
import { EzEdgeShape } from '../../edge-shape';
import { EzShapeStyle } from '../../shape';
/**
 *  EzLineShape is a kind of edge shape , which points are all connected with straight line
 */
export class EzTreeLineShape extends EzEdgeShape {
    line:EzElement;

    transparentLine:EzElement;

    constructor(state:EzEdgeViewState){
        super(state);
    }

    draw():void {
        const state = this.state as EzEdgeViewState;
        const markerStyle:EzShapeStyle = {};
        const points = state.points;
        if(points.length !==2){
            if(__DEV__){
                console.error('unexpected point length');
            }
        }
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
        this.line = EzElement.line(this._getPoints(points)).attr(this.style);
        this.transparentLine = this.line.clone()
            .attr({strokeWidth:+this.style.strokeWidth+DEFAULT_MOUSE_ACTION_TOLERENCE, stroke:'transparent'})
            .removeAttr('markerStart')
            .removeAttr('markerEnd');
        this.root.appendChildren([this.line, this.transparentLine]);
    }

    redraw():void {
        const state = (this.state.alternate || this.state) as EzEdgeViewState;
        const points = this._getPoints(state.points);
        this.line.line(points);
        this.transparentLine.line(points);
    }

    private _getPoints(points:EzPoint[]):EzPoint[] {
        const pt1 = points[0];
        const pt2 = points[1];
        const w = pt2.x-pt1.x;
        const h = pt2.y-pt1.y;
        let c1:EzPoint;
        let c2:EzPoint;
        if(this.state.style.direction==='vertical'){
            c1 = new EzPoint(pt1.x, pt1.y+h/2);
            c2 = new EzPoint(pt2.x, pt1.y+h/2);
        }else {
            c1 = new EzPoint( pt1.x+w/2, pt1.y);
            c2 = new EzPoint( pt1.x+w/2, pt2.y);
        }

        return [pt1, c1, c2, pt2];
    }
}