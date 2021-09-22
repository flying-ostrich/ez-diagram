import { EzShapeStyle } from '..';
import { EZ_VIEW_VERTEX_CLASS } from '../../constants';
import { EzMouseEvent } from '../../event/event';
import { getSvgStyle } from '../style/style';
import { EzVertexViewState } from '../view/view-state';
import { EzShape } from './shape';

export interface VertexShapeLifeCycle {
    onStartEditing():void;
    onStopEditing():void;
    onClick(evt:EzMouseEvent):void;
    onDblClick(evt:EzMouseEvent):void;
    onMouseMove(evt:EzMouseEvent):void;
    onMouseDown(evt:EzMouseEvent):void;
    onMouseUp(evt:EzMouseEvent):void;
}


export class EzVertexShape extends EzShape implements VertexShapeLifeCycle {
    state:EzVertexViewState;

    style:EzShapeStyle;

    constructor(state:EzVertexViewState){
        super();
        if(__DEV__){
            if(!(state instanceof EzVertexViewState)){
                console.error(`EzRectangleShape: expect state instance of EzVertexViewState, got ${Object.prototype.toString.call(state)}`);
            }
        }
        this.state = state;
        this.style = getSvgStyle(this.state.style);
        this.root.attr({dataId:state.node.id, class:EZ_VIEW_VERTEX_CLASS });
        this.root.el['state'] = this.state;
    }

    draw():void {
        this._updateRotation();
        this.style = getSvgStyle(this.state.style);
    }

    redraw():void{
        this._updateRotation();
        this.style = getSvgStyle(this.state.style);

    }

    private _updateRotation():void {
        const state = this.state.alternate || this.state;
        const center = state.getBounds().center();
        this.root.attr({transform:`rotate(${state.style.rotation||0},${center.x},${center.y})`});
    }

    updateStyle():void {}

    onStartEditing():void {}

    onStopEditing():void {}

    onClick():void {}

    onDblClick(): void {}

    onMouseMove(): void {}

    onMouseDown(): void {}

    onMouseUp(): void {}
}