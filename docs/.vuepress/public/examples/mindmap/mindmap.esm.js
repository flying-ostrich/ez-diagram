import {
  EzDiagram,
  EzVertex,
  EzRectangle,
  BUILTIN_SHAPE,
  Layout,
  EzEdge,
  BUILTIN_MARKER,
  EzDirection,
  EzPoint,
} from "../../ez-diagram-esm/ez-diagram-esm.js";
import { MindMapPlugin, MINDMAP_PLGUIN } from "./mindmap.plugin.js";

const container = document.querySelector(".container");
const diagram = new EzDiagram(container, { background: true });
diagram.pluginManager.use(
  MINDMAP_PLGUIN,
  new MindMapPlugin(diagram, diagram.pluginManager.getContext())
);

/**
 * use  EzVertex to create a vertex. then add it to graph
 */
const addVertex = (shapeType, bounds, text, layout, styles = {}) => {
  const vertex = new EzVertex(
    bounds,
    { shape: shapeType, ...styles, stroke: "none" },
    text,
    layout
  );
  diagram.addVertex(vertex);
  return vertex;
};

const root = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(50, 250, 220, 25),
  "root",
  Layout.BUILTIN_LAYOUT.TREE_LAYOUT
);

const c1 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(300, 50, 220, 25),
  "c1"
);

const c2 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(300, 50, 220, 25),
  "c2"
);

const c1_1 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(300, 50, 220, 25),
  "c11"
);

const c1_2 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(300, 50, 220, 25),
  "c12"
);

const c2_1 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(300, 50, 220, 25),
  "c21"
);

const c2_2 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(300, 50, 220, 25),
  "c22"
);

const c2_2_1 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(300, 50, 220, 25),
  "c221"
);

const genConnectEdge = () => {
  const edge = new EzEdge([new EzPoint(0, 0), new EzPoint(0, 0)], {
    shape: BUILTIN_SHAPE.EDGE.TREE_LINE,
    markerEnd: BUILTIN_MARKER.TRIANGLE,
    direction: "horizontal",
  });
  diagram.addEdge(edge);
  return edge;
};

const connect = (source, target, direction = EzDirection.RIGHT) => {
  diagram.model.setLayoutChild(source, target, direction, genConnectEdge());
};

connect(root, c1);
connect(root, c2);
connect(c1, c1_1);
connect(c1, c1_2);
connect(c2, c2_1);
connect(c2, c2_2);
connect(c2_2, c2_2_1);

root.layoutChild = c1;
c1.layoutSibling = c2;
c1.layoutChild = c1_1;
c1_1.layoutSibling = c1_2;
c2.layoutChild = c2_1;
c2_1.layoutSibling = c2_2;
c2_2.layoutChild = c2_2_1;

diagram.render();

window.diagram = diagram;
