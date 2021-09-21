import { EzRectangle } from '../../../model';
import { EzElement } from '../../canvas/ez-element';
import { EzMarker } from '../marker';

export const squareMarker = new EzMarker(
    4, 4, 2, 2, ()=>{
        return EzElement.el('rect').attr(new EzRectangle(0, 0, 4, 4).plain()).el;
    }
);