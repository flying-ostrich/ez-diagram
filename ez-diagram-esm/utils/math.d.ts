import { EzRectangle } from '../model';
import { EzPoint } from '../model/point';
export interface Vector {
    x: number;
    y: number;
}
export interface RectPoints {
    BOTTOM_LEFT: EzPoint;
    BOTTOM_RIGHT: EzPoint;
    TOP_LEFT: EzPoint;
    TOP_RIGHT: EzPoint;
}
/**
 *  given two points , return a vector which starts from the startPoint
 *  and ends with endPoint
 * @param startPoint
 * @param endPoint
 */
export declare function getVector(startPoint: EzPoint, endPoint: EzPoint): Vector;
/**
 *  get norm of a given vector
 * @param vector
 */
export declare function getNormOfVector(vector: Vector): number;
/**
 *  get a scalar mul val of a given vector
 * @param vector
 * @param scalar
 * @returns
 */
export declare function getScalarMulOfVector(vector: Vector, scalar: number): Vector;
/**
 *  get unit vector of a given vector
 * @param vector
 */
export declare function getUnitVector(vector: Vector): Vector;
/**
 *  given a vector and it’s start point , return end point
 * @param vector
 * @param startPoint
 */
export declare function getVectorEndPoint(vector: Vector, startPoint: EzPoint): EzPoint;
/**
 * calculate bounding box from points
 * @param points
 */
export declare function getBoundingBoxFromPoints(points: EzPoint[]): EzRectangle;
/**
 * get dot product of two vectors
 * @param vector1
 * @param vector2
 * @returns
 */
export declare function getDotProduct(vector1: Vector, vector2: Vector): number;
/**
 * get included angle of two vectors
 * @param vector1
 * @param vector2
 * @returns
 */
export declare function getIncludedAngleOfTwoVector(vector1: Vector, vector2: Vector): number;
/**
 * get vector1's projection on vector2
 * @param vector1
 * @param vector2
 */
export declare function getVectorProjection(vector1: Vector, vector2: Vector): number;
/**
 * get four vertexes of a rectangle
 * @param rect
 * @returns
 */
export declare function toRectPoints(rect: EzRectangle, rotation?: number): RectPoints;
/**
 * return if the given point is inside a rectangle
 * @param rectPoints
 * @param point
 * @returns
 */
export declare function isPointInsideRect(rectPoints: RectPoints, point: EzPoint): boolean;
export declare function getRotatedPoint(originalPoint: EzPoint, rotation: number, rotateCenterPoint: EzPoint): EzPoint;
export declare function toRadians(deg: any): number;
export declare function getCenterPoint(point1: EzPoint, point2: EzPoint): EzPoint;
