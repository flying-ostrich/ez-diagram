import {
  EzDiagram,
  EzVertex,
  EzRectangle,
  EzEdge,
  EzPoint,
  EzConstraint,
  BUILTIN_SHAPE,
  BUILTIN_MARKER,
} from "../../ez-diagram-esm/ez-diagram-esm.js";

const container = document.querySelector(".container");
const diagram = new EzDiagram(container);
const hello = new EzVertex(
  new EzRectangle(100, 100, 200, 100),
  {
    shape: BUILTIN_SHAPE.RECTANGLE,
  },
  "hello"
);

const edge = new EzEdge([new EzPoint(300, 150), new EzPoint(400, 150)], {
  shape: BUILTIN_SHAPE.LINE,
  markerEnd: BUILTIN_MARKER.TRIANGLE,
});

const world = new EzVertex(
  new EzRectangle(400, 100, 200, 100),
  {
    shape: BUILTIN_SHAPE.RECTANGLE,
  },
  "world"
);

edge.setEndPoint(hello, new EzConstraint(1, 0.5, 0, 0), true);
edge.setEndPoint(world, new EzConstraint(0, 0.5, 0, 0), false);

diagram.addVertex(hello);
diagram.addEdge(edge);
diagram.addVertex(world);
