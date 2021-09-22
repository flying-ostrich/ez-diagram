import {
  EzDiagram,
  EzVertex,
  EzRectangle,
  BUILTIN_SHAPE,
} from "../../ez-diagram-esm/ez-diagram-esm.js";

const container = document.querySelector(".container");
const diagram = new EzDiagram(container, { background: true });

/**
 * use  EzVertex to create a vertex. then add it to graph
 */
const addVertex = (shapeType, bounds, text) => {
  const vertex = new EzVertex(bounds, { shape: shapeType }, text);
  diagram.addVertex(vertex);
};

addVertex(
  BUILTIN_SHAPE.RECTANGLE,
  new EzRectangle(105, 105, 100, 100),
  "Rectangle Shape"
);
addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DATA,
  new EzRectangle(215, 105, 100, 100),
  "FlowChart Data"
);
addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DECISION,
  new EzRectangle(325, 105, 100, 100),
  "FlowChart Decision"
);

addVertex(
  BUILTIN_SHAPE.FLOW_CHART.ALTERNATE_PROCESS,
  new EzRectangle(435, 105, 100, 100),
  "FlowChart Alternate Process"
);

addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DELAY,
  new EzRectangle(545, 105, 100, 100),
  "FlowChart Delay"
);

addVertex(
  BUILTIN_SHAPE.FLOW_CHART.DOCUMENT,
  new EzRectangle(655, 105, 100, 100),
  "FlowChart Documents"
);

diagram.render();
