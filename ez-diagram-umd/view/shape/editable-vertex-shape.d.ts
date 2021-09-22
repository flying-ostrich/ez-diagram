import { EzElement } from '../canvas/ez-element';
import { EzVertexShape } from './vertex-shape';
export declare class EditableVertexShape extends EzVertexShape {
    text: EzElement;
    foreignObject: EzElement;
    draw(): void;
    redraw(): void;
    onStartEditing(): void;
    onStopEditing(): void;
    private _udpateStyle;
}
