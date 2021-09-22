export declare class EzPoint {
    x: number;
    y: number;
    constructor(x: number, y: number);
    translate(point: EzPoint): EzPoint;
    clone(): EzPoint;
}
