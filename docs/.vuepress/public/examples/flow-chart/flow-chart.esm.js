import {
  EzDiagram,
  EzVertex,
  EzRectangle,
  BUILTIN_SHAPE,
  EzEdge,
  EzConstraint,
  EzPoint,
  BUILTIN_MARKER,
} from "../../ez-diagram-esm/ez-diagram-esm.js";

const container = document.querySelector(".container");
const diagram = new EzDiagram(container, { background: true });

/**
 * use  EzVertex to create a vertex. then add it to graph
 */
const addVertex = (shapeType, bounds, text, styles = {}) => {
  const vertex = new EzVertex(bounds, { shape: shapeType, ...styles }, text);
  diagram.addVertex(vertex);
  return vertex;
};

/**
 * use  EzEdge to create a edge. then add it to graph
 */
const addEdge = (
  points,
  source,
  sourceConstraint,
  target,
  targetConstraint,
  styles = {}
) => {
  const edge = new EzEdge(points, { shape: BUILTIN_SHAPE.LINE, ...styles });
  if (source) {
    edge.setEndPoint(source, sourceConstraint, true);
  }
  if (target) {
    edge.setEndPoint(target, targetConstraint, false);
  }
  diagram.addEdge(edge);
  return edge;
};

const addSwimlane = (offsetY = 0, title = "") => {
  const v1 = addVertex(
    BUILTIN_SHAPE.RECTANGLE,
    new EzRectangle(20, 60 + offsetY, 125, 30),
    title,
    {
      rotation: -90,
      editable: false,
      selectable: false,
    }
  );
  const v2 = addVertex(
    BUILTIN_SHAPE.RECTANGLE,
    new EzRectangle(68, 13 + offsetY, 800, 125),
    "",
    {
      editable: false,
      selectable: false,
    }
  );
  v1.constraints = [];
  v2.constraints = [];
};

const addSwimlanes = () => {
  addSwimlane(0, "Student");
  addSwimlane(125, "Administration");
  addSwimlane(250, "Registrar");
  addSwimlane(375, "Faculty Advisor");
};

addSwimlanes();
/*****=====================add uml shapes==========================*********/
const v1 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(115, 36, 120, 80),
  `Submit \n Registration`
);

const v2 = addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DOCUMENT,
  new EzRectangle(715, 36, 120, 80),
  `Acceptance Letter`
);

const v3 = addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DECISION,
  new EzRectangle(105, 160, 140, 80),
  `Application \n Complete?`
);

const v4 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(455, 160, 140, 80),
  `Write Rejection Letter`
);

const v5 = addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DECISION,
  new EzRectangle(305, 285, 140, 80),
  `Minimum \n Standard \n Met?`
);

const v6 = addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DECISION,
  new EzRectangle(455, 410, 140, 80),
  `Suitable For Program?`
);

const v7 = addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(715, 410, 120, 80),
  `Write Acceptance Letter`
);
/*****=====================add edges ==========================*********/
addEdge(
  [new EzPoint(175, 116), new EzPoint(175, 160)],
  v1,
  new EzConstraint(0.5, 1, 0, 0),
  v3,
  new EzConstraint(0.5, 0, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);

addEdge(
  [new EzPoint(175, 240), new EzPoint(175, 325), new EzPoint(305, 325)],
  v3,
  new EzConstraint(0.5, 1, 0, 0),
  v5,
  new EzConstraint(0, 0.5, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);

addEdge(
  [new EzPoint(377, 285), new EzPoint(376, 199), new EzPoint(455, 200)],
  v5,
  new EzConstraint(0.5, 0, 0, 0),
  v4,
  new EzConstraint(0, 0.5, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);

addEdge(
  [new EzPoint(375, 365), new EzPoint(375, 450), new EzPoint(455, 450)],
  v5,
  new EzConstraint(0.5, 1, 0, 0),
  v6,
  new EzConstraint(0, 0.5, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);

addEdge(
  [new EzPoint(525, 410), new EzPoint(525, 240)],
  v6,
  new EzConstraint(0.5, 0, 0, 0),
  v4,
  new EzConstraint(0.5, 1, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);

addEdge(
  [new EzPoint(595, 450), new EzPoint(715, 450)],
  v6,
  new EzConstraint(1, 0.5, 0, 0),
  v7,
  new EzConstraint(0, 0.5, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);

addEdge(
  [new EzPoint(775, 410), new EzPoint(775, 116)],
  v7,
  new EzConstraint(0.5, 0, 0, 0),
  v2,
  new EzConstraint(0.5, 1, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);

addEdge(
  [new EzPoint(525, 160), new EzPoint(525, 76), new EzPoint(715, 76)],
  v4,
  new EzConstraint(0.5, 0, 0, 0),
  v2,
  new EzConstraint(0, 0.5, 0, 0),
  { markerEnd: BUILTIN_MARKER.TRIANGLE }
);
/************** add yes or no text ********************/

const addText = (position, text) => {
  addVertex(BUILTIN_SHAPE.RECTANGLE, position, text, {
    stroke: "transparent",
    fill: "white",
  });
};

addText(new EzRectangle(177, 281, 33, 26), "Yes");
addText(new EzRectangle(373, 168, 33, 26), "No");
addText(new EzRectangle(342, 409, 33, 26), "Yes");
addText(new EzRectangle(533, 301, 33, 26), "No");
addText(new EzRectangle(633, 421, 33, 26), "Yes");

diagram.render();

window.diagram = diagram;
