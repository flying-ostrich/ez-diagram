import { EzEdge ,EzVertex,BUILTIN_SHAPE} from "../ez-diagram-esm/ez-diagram-esm.js";

/**
 * helper function to create an edge and put it on a diagram
 * @param {EzDiagram} diagram 
 * @param {EzPoint[]} points 
 * @param {string} markerStart 
 * @param {string} markerEnd 
 */
export const addEdge = (diagram, points, markerStart, markerEnd) => {
 const edge = new EzEdge(points, {
   shape: BUILTIN_SHAPE.LINE,
   markerStart,
   markerEnd,
 });
 diagram.addEdge(edge);
};

/**
 * 
 * @param {EzDiagram} diagram 
 * @param {string} shapeType 
 * @param {EzRectangle} bounds 
 * @param {string} text 
 * @param {Object} styles 
 * @returns 
 */
export const addVertex = (diagram,shapeType, bounds, text, styles = {}) => {
    const vertex = new EzVertex(bounds, { shape: shapeType, ...styles }, text);
    diagram.addVertex(vertex);
    return vertex;
};