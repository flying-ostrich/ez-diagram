import { EzElement } from '../../canvas/ez-element';
import { EzShape } from '../shape';
export declare class GridBackgroundShape extends EzShape {
    grid: EzElement;
    gridSize: number;
    draw(): void;
    redraw(): void;
    updateStyle(): void;
}
