const container = document.querySelector(".container");
const diagram = new Ez.EzDiagram(container, { background: true });
const hello = new Ez.EzVertex(
  new Ez.EzRectangle(200, 100, 200, 100),
  {
    shape: Ez.BUILTIN_SHAPE.RECTANGLE,
  },
  "hello"
);

const edge = new Ez.EzEdge(
  [new Ez.EzPoint(400, 150), new Ez.EzPoint(500, 150)],
  {
    shape: Ez.BUILTIN_SHAPE.LINE,
    markerEnd: Ez.BUILTIN_MARKER.TRIANGLE,
  }
);

const world = new Ez.EzVertex(
  new Ez.EzRectangle(500, 100, 200, 100),
  {
    shape: Ez.BUILTIN_SHAPE.RECTANGLE,
  },
  "world"
);

edge.setEndPoint(hello, new Ez.EzConstraint(1, 0.5, 0, 0), true);
edge.setEndPoint(world, new Ez.EzConstraint(0, 0.5, 0, 0), false);

diagram.addVertex(hello);
diagram.addEdge(edge);
diagram.addVertex(world);
diagram.render();
