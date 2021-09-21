import { EzElement } from '../../canvas/ez-element';
import { EzShape } from '../shape';

export class GridBackgroundShape extends EzShape {
    grid:EzElement;

    gridSize = 8;

    draw():void {
        this.grid = EzElement.el('rect').attr({...this.style, ...{
            x:0,
            y:0,
            width:this.gridSize,
            height:this.gridSize,
            fill:'none',
            stroke:'red',
            strokeWidth:5
        }});
    }

    redraw():void {}

    updateStyle():void {}
}