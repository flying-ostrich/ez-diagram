import { EzDirection } from '../../constants';
/**
 * EzConstaint defined how a side of edge connect to it's terminal vertex
 * The Ezcontaint use four properties to define the connection releationship
 * between edge and vertex: percentX / percentY / offsetX / offsetY
 * for example:
 * ```
 *   // the following constraint indicates one edge should connect the center point of it's terminal
 *   let contraint = new EzConstraint(0.5,0.5,0,0);
 *   // the following constraint indicates one edge should connect the top-left corner with 5 pixel offset on x axis
 *   let contraint = new EzConstraint(0,0,5,0);
 * ```
 *
 */
export declare class EzConstraint {
    percentX: number;
    percentY: number;
    offsetX: number;
    offsetY: number;
    constructor(percentX: number, percentY: number, offsetX?: number, offsetY?: number);
    static createByDirection(direction: EzDirection): EzConstraint;
}
