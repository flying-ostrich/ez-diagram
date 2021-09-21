import {
  EzDiagram,
  EzEdge,
  BUILTIN_SHAPE,
  EzPoint,
  BUILTIN_MARKER,
} from "../../ez-diagram-esm/ez-diagram-esm.js";

const container = document.querySelector(".container");
const diagram = new EzDiagram(container, { background: true });

/**
 * use  EzEdge to create a edge. then add it to graph
 */
const addEdge = (points, markerStart, markerEnd) => {
  const edge = new EzEdge(points, {
    shape: BUILTIN_SHAPE.LINE,
    markerStart,
    markerEnd,
  });
  diagram.addEdge(edge);
};

addEdge([new EzPoint(350, 50), new EzPoint(650, 50)], BUILTIN_MARKER.SQUARE);
addEdge(
  [new EzPoint(350, 150), new EzPoint(650, 150)],
  BUILTIN_MARKER.TRIANGLE
);
addEdge(
  [new EzPoint(350, 250), new EzPoint(650, 250)],
  BUILTIN_MARKER.SQUARE,
  BUILTIN_MARKER.TRIANGLE
);

diagram.render();
