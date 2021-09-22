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
import { OrgLayoutPlugin, ORG_LAYOUT_PLUGIN } from "./org-layout.plugin.js";
import "./org-node-shape.js";
import { OrgNodeShape, ORG_NODE_SHAPE } from "./org-node-shape.js";

const container = document.querySelector(".container");
const diagram = new EzDiagram(container, { background: true });
// register shape
diagram.view.shapeManager.registerShape(ORG_NODE_SHAPE, OrgNodeShape);
diagram.pluginManager.use(
  ORG_LAYOUT_PLUGIN,
  new OrgLayoutPlugin(diagram, diagram.pluginManager.getContext())
);

/**
 * use  EzVertex to create a vertex. then add it to graph
 */
const addVertex = (shapeType, bounds, text, layout, styles = {}) => {
  const vertex = new EzVertex(
    bounds,
    { shape: shapeType, ...styles, editable: false },
    text,
    layout
  );
  diagram.addVertex(vertex);
  return vertex;
};

const root = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(375, 100, 220, 75),
  JSON.stringify({
    name: "Stella Payne Diaz",
    title: "CEO",
    id: 9527,
  }),
  Layout.BUILTIN_LAYOUT.TREE_LAYOUT
);

const c1 = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(300, 50, 220, 75),
  JSON.stringify({
    name: "Luke Warm",
    title: "VP Marketing",
    id: 9528,
  })
);

const c2 = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(300, 50, 220, 75),
  JSON.stringify({
    name: "Peggy Flaming",
    title: "VP Engineering",
    id: 9529,
  })
);

const c1_1 = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(300, 50, 220, 75),
  JSON.stringify({
    name: "Meg Meehan Hoffa",
    title: "Sales",
    id: 9510,
  })
);

const c1_2 = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(300, 50, 220, 75),
  JSON.stringify({
    name: "Al Ligori",
    title: "Markting",
    id: 9521,
  })
);

const c2_1 = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(300, 50, 220, 75),
  JSON.stringify({
    name: "Saul Wellingood",
    title: "Manufacturing",
    id: 9530,
  })
);

const c2_2 = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(300, 50, 220, 75),
  JSON.stringify({
    name: "Xavier Breath",
    title: "Engineering",
    id: 9531,
  })
);

const c2_2_1 = addVertex(
  ORG_NODE_SHAPE,
  new EzRectangle(300, 50, 220, 75),
  JSON.stringify({
    name: "Marge Innovera",
    title: "Hardware",
    id: 9527,
  })
);

const genConnectEdge = () => {
  const edge = new EzEdge([new EzPoint(0, 0), new EzPoint(0, 0)], {
    shape: BUILTIN_SHAPE.EDGE.TREE_LINE,
    markerEnd: BUILTIN_MARKER.TRIANGLE,
    direction: "vertical",
  });
  diagram.addEdge(edge);
  return edge;
};

const connect = (source, target, direction = EzDirection.BOTTOM) => {
  diagram.model.setLayoutChild(source, target, direction, genConnectEdge());
};

connect(root, c1);
connect(root, c2);
connect(c1, c1_1);
connect(c1, c1_2);
connect(c2, c2_1);
connect(c2, c2_2);
connect(c2_1, c2_2_1);

diagram.render();

window.diagram = diagram;
