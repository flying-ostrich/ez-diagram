import { EzShapeStyle } from '..';
import { EzMouseEvent } from '../../event/event';
import { EzVertexViewState } from '../view/view-state';
import { EzShape } from './shape';
export interface VertexShapeLifeCycle {
    onStartEditing(): void;
    onStopEditing(): void;
    onClick(evt: EzMouseEvent): void;
    onDblClick(evt: EzMouseEvent): void;
    onMouseMove(evt: EzMouseEvent): void;
    onMouseDown(evt: EzMouseEvent): void;
    onMouseUp(evt: EzMouseEvent): void;
}
export declare class EzVertexShape extends EzShape implements VertexShapeLifeCycle {
    state: EzVertexViewState;
    style: EzShapeStyle;
    constructor(state: EzVertexViewState);
    draw(): void;
    redraw(): void;
    private _updateRotation;
    updateStyle(): void;
    onStartEditing(): void;
    onStopEditing(): void;
    onClick(): void;
    onDblClick(): void;
    onMouseMove(): void;
    onMouseDown(): void;
    onMouseUp(): void;
}
