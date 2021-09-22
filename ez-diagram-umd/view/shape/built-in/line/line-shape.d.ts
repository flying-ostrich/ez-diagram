import { EzElement } from '../../../canvas/ez-element';
import { EzEdgeViewState } from '../../../view/view-state';
import { EzEdgeShape } from '../../edge-shape';
/**
 *  EzLineShape is a kind of edge shape , which points are all connected with straight line
 */
export declare class EzLineShape extends EzEdgeShape {
    line: EzElement;
    transparentLine: EzElement;
    constructor(state: EzEdgeViewState);
    draw(): void;
    redraw(): void;
}
