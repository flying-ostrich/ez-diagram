import { EzRectangle } from '../model';
import { EzPoint } from '../model/point';

export interface Vector {
    x:number;
    y:number;
}

export interface RectPoints {
    BOTTOM_LEFT:EzPoint;
    BOTTOM_RIGHT:EzPoint;
    TOP_LEFT:EzPoint;
    TOP_RIGHT:EzPoint;
}

/**
 *  given two points , return a vector which starts from the startPoint 
 *  and ends with endPoint
 * @param startPoint 
 * @param endPoint 
 */
export function getVector(startPoint:EzPoint, endPoint:EzPoint):Vector {
    return {x: endPoint.x - startPoint.x,
        y: endPoint.y - startPoint.y};
}

/**
 *  get norm of a given vector
 * @param vector 
 */
export function getNormOfVector(vector:Vector):number {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

/**
 *  get a scalar mul val of a given vector
 * @param vector 
 * @param scalar 
 * @returns 
 */
export function getScalarMulOfVector(vector:Vector, scalar:number):Vector {
    return {x:vector.x * scalar,
        y:vector.y * scalar};
}

/**
 *  get unit vector of a given vector
 * @param vector 
 */
export function getUnitVector(vector:Vector):Vector {
    const norm = getNormOfVector(vector);
    return getScalarMulOfVector(vector, 1/norm);
}

/**
 *  given a vector and it’s start point , return end point
 * @param vector 
 * @param startPoint 
 */
export function getVectorEndPoint(vector:Vector, startPoint:EzPoint):EzPoint {
    return new EzPoint(vector.x+startPoint.x, vector.y+startPoint.y);
}

/**
 * calculate bounding box from points
 * @param points 
 */
export function getBoundingBoxFromPoints(points:EzPoint[]):EzRectangle {
    const xs = points.map(p=>p.x);
    const ys = points.map(p=>p.y);
    const [xMin, xMax, yMin, yMax] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    return new EzRectangle(xMin, yMin, xMax-xMin, yMax-yMin);
}

/**
 * get dot product of two vectors
 * @param vector1
 * @param vector2
 * @returns
 */
export function getDotProduct (vector1: Vector, vector2: Vector):number {
    return vector1.x * vector2.x + vector1.y * vector2.y;
}
  

/**
 * get included angle of two vectors
 * @param vector1
 * @param vector2
 * @returns
 */
export function getIncludedAngleOfTwoVector(vector1: Vector, vector2: Vector): number {
    const dotProduct = getDotProduct(vector1, vector2);
    const norm1 = getNormOfVector(vector1);
    const norm2 = getNormOfVector(vector2);
    const cosAngle = dotProduct / (norm1 * norm2);
    const radian = Math.acos(cosAngle);
    return (radian * 180) / Math.PI;
}

/**
 * get vector1's projection on vector2
 * @param vector1
 * @param vector2
 */
export function getVectorProjection(vector1: Vector, vector2: Vector): number {
    return (vector1.x * vector2.x + vector1.y * vector2.y) / getNormOfVector(vector2);
}

/**
 * get four vertexes of a rectangle 
 * @param rect 
 * @returns 
 */
export function toRectPoints(rect:EzRectangle, rotation = 0):RectPoints{
    const points = {
        TOP_LEFT:getRotatedPoint(new EzPoint(rect.x, rect.y), rotation, rect.center()),
        TOP_RIGHT:getRotatedPoint( new EzPoint(rect.x+rect.width, rect.y), rotation, rect.center()),
        BOTTOM_LEFT:getRotatedPoint( new EzPoint(rect.x, rect.y+rect.height), rotation, rect.center()),
        BOTTOM_RIGHT:getRotatedPoint( new EzPoint(rect.x+rect.width, rect.y+rect.height), rotation, rect.center())
    };

    return points;
}

/**
 * return if the given point is inside a rectangle
 * @param rectPoints 
 * @param point 
 * @returns 
 */
export function isPointInsideRect(rectPoints: RectPoints, point: EzPoint): boolean {
    const getCross = (p1: EzPoint, p2: EzPoint, p: EzPoint) => {
        return (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);
    };
    return (
      getCross(rectPoints.BOTTOM_LEFT, rectPoints.TOP_LEFT, point) * getCross(rectPoints.TOP_RIGHT, rectPoints.BOTTOM_RIGHT, point) >= 0 &&
      getCross(rectPoints.TOP_LEFT, rectPoints.TOP_RIGHT, point) * getCross(rectPoints.BOTTOM_RIGHT, rectPoints.BOTTOM_LEFT, point) >= 0
    );
}

export function getRotatedPoint(originalPoint: EzPoint, rotation:number, rotateCenterPoint:EzPoint) {
    const x = originalPoint.x - rotateCenterPoint.x;
    const y = originalPoint.y - rotateCenterPoint.y;
    const cos = Math.cos(toRadians(rotation));
    const sin = Math.sin(toRadians(rotation));
    const dx = x * cos - y * sin;
    const dy = y * cos + x * sin;
    return new EzPoint(rotateCenterPoint.x + dx, rotateCenterPoint.y + dy);
}

export function toRadians(deg) {
    return (Math.PI * deg) / 180;
}


export function getCenterPoint(point1:EzPoint, point2:EzPoint):EzPoint {
    return new EzPoint((point1.x+point2.x)/2, (point1.y+point2.y)/2);
}
