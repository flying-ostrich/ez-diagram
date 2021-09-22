import { EzPoint } from './point';
export declare class EzRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    /**
     *  return center point
     */
    center(): EzPoint;
    clone(): EzRectangle;
    plain(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    grow(expanding: number): EzRectangle;
    add(rect: EzRectangle): EzRectangle;
    static scale({ x, y, width, height }: EzRectangle, scale: number): EzRectangle;
    static translate({ x, y, width, height }: EzRectangle, distance: EzPoint): EzRectangle;
}
