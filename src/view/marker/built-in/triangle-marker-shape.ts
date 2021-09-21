import { EzPoint } from '../../../model';
import { EzElement } from '../../canvas/ez-element';
import { EzMarker } from '../marker';

export const triangleMarker = new EzMarker(
    4, 4, 3.5, 2, ()=>{
        return EzElement.line([
            new EzPoint(0, 0),
            new EzPoint(0, 4),
            new EzPoint(4, 2),
            new EzPoint(0, 0)
        ]).el;
    }
);