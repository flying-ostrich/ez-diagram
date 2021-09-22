import { EzMarker } from './marker';
export declare const BUILTIN_MARKER: {
    SQUARE: string;
    TRIANGLE: string;
};
export declare class EzMarkerRegister {
    static markers: Map<string, EzMarker>;
    static registerMarker(markerName: string, marker: EzMarker): boolean;
}
