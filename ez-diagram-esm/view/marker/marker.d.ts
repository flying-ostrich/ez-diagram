export declare type MarkerShapeGetter = () => Element;
export declare class EzMarker {
    markerWidth: number;
    markerHeight: number;
    refX: number;
    refY: number;
    markerNode: SVGMarkerElement;
    constructor(markerWidth: number, markerHeight: number, refX: number, refY: number, shapeGetter: MarkerShapeGetter);
    private drawMarker;
}
