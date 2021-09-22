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

const addSwimlane = (swimlaneTitle, position, contents) => {
  const v1 = addVertex(
    BUILTIN_SHAPE.RECTANGLE,
    new EzRectangle(position.x, position.y, position.width, position.height),
    "",
    {
      fill: "#dbdfea",
      selectable: false,
      editable: false,
    }
  );
  const v2 = addVertex(
    BUILTIN_SHAPE.RECTANGLE,
    new EzRectangle(
      position.x,
      position.y,
      position.width,
      position.height * 0.1
    ),
    swimlaneTitle,
    {
      fill: "#545465",
      color: "white",
      fontSize: "20px",
      selectable: false,
      editable: false,
    }
  );
  v1.constraints = [];
  v2.constraints = [];

  contents = contents || [];
  contents.forEach((content, idx) => {
    const height = position.height * 0.12;
    addVertex(
      BUILTIN_SHAPE.STICKER,
      new EzRectangle(
        position.x + position.width * 0.05,
        position.y + 70 + (height + 10) * idx,
        position.width * 0.9,
        height
      ),
      content,
      {
        fontSize: "14px",
        fill: "rgb(255, 207, 47)",
      }
    );
  });
};
addSwimlane("Previouse Goal", new EzRectangle(50, 50, 200, 500), [
  "prepare a session for FE performance --flying ostrich",
  `write on boarding documents for project --lisa`,
]);
addSwimlane("Well", new EzRectangle(270, 50, 200, 500), [
  "two new colleagues  joined us  , welcome!!!",
]);
addSwimlane("Less Well", new EzRectangle(490, 50, 200, 500), [
  "we do not have a formal coding standard~~",
  "a lot of bugs!!!",
  "we spare much time on a unimport issue , i hope we can be more focused",
]);
addSwimlane("Suggestion", new EzRectangle(710, 50, 200, 500), [
  "when will we TB ？ ",
]);

diagram.render();
