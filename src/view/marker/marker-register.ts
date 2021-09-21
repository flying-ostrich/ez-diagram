import { squareMarker } from './built-in/square-marker-shape';
import { triangleMarker } from './built-in/triangle-marker-shape';
import { EzMarker } from './marker';

export const BUILTIN_MARKER = {SQUARE : 'SQUARE', TRIANGLE : 'TRIANGLE'};

export class EzMarkerRegister {
    static markers:Map<string, EzMarker> = new Map();

    static registerMarker(markerName:string, marker:EzMarker):boolean{
        if(!marker) return;

        if(EzMarkerRegister.markers.has(markerName)) return;

        EzMarkerRegister.markers.set(markerName, marker);
        return true;
    }
}

EzMarkerRegister.registerMarker(BUILTIN_MARKER.SQUARE, squareMarker);
EzMarkerRegister.registerMarker(BUILTIN_MARKER.TRIANGLE, triangleMarker);

