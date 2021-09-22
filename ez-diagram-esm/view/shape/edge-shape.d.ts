import { EzShape } from './shape';
import { EzEdgeViewState } from '../view/view-state';
import { EzShapeStyle } from '..';
export declare abstract class EzEdgeShape extends EzShape {
    state: EzEdgeViewState;
    style: EzShapeStyle;
    constructor(state: EzEdgeViewState);
    updateStyle(): void;
}
