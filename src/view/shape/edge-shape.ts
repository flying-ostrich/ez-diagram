import { EzShape } from './shape';
import { EzEdgeViewState} from '../view/view-state';
import { EzShapeStyle } from '..';
import { getSvgStyle } from '../style/style';
import { EZ_VIEW_EDGE_CLASS } from '../../constants';

export abstract class EzEdgeShape extends EzShape {
    state:EzEdgeViewState;

    style:EzShapeStyle;

    constructor(state:EzEdgeViewState){
        super();
        if(__DEV__){
            if(!(state instanceof EzEdgeViewState)){
                console.error(`EzEdgeShape: expect state instance of EzEdgeViewState, got ${Object.prototype.toString.call(state)}`);
            }
        }
        this.state = state;
        this.style = getSvgStyle(this.state.style);
        this.root.attr({dataId:state.node.id, class:EZ_VIEW_EDGE_CLASS, });

        this.root.el['state'] = state;
    }

    updateStyle():void {}
}