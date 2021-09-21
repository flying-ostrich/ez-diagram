import {
  EzRectangle,
  EzVertex,
  BUILTIN_SHAPE,
} from "../../ez-diagram-esm/ez-diagram-esm.js";

export const applyShapeSelector = (diagram) => {
  // setup shape drag drop listener
  document
    .querySelector(".shape-selector")
    .addEventListener("dragstart", (evt) => {
      const target = evt.target;
      const title =
        target.getAttribute("title") ||
        target?.firstElementChild.getAttribute("title");
      if (target.matches(".sticker")) {
        evt.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            type: "shape",
            shape: BUILTIN_SHAPE.STICKER,
            fill: target.querySelector("rect").getAttribute("fill"),
          })
        );
      } else if (target.matches(".round-sticker")) {
        evt.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            type: "shape",
            shape: BUILTIN_SHAPE.ROUND_STICKER,
            fill: target.querySelector("rect").getAttribute("fill"),
          })
        );
      } else {
        evt.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            type: "shape",
            shape: title,
          })
        );
      }
    });

  const c = document.querySelector(".container");
  c.addEventListener("dragover", (evt) => {
    evt.preventDefault();
  });
  c.addEventListener("drop", (evt) => {
    const elInfoStr = evt.dataTransfer.getData("text/plain");
    const elInfo = JSON.parse(elInfoStr);
    if (elInfo.type === "shape") {
      const shapeType = elInfo.shape;
      const position = diagram.view.getMousePointRelateToContainer(evt);
      if (!shapeType) return;
      const config = {
        shape: shapeType,
      };
      if (elInfo.fill) {
        config.fill = elInfo.fill;
      }

      diagram.addVertex(
        new EzVertex(
          new EzRectangle(position.x - 150 / 2, position.y - 100 / 2, 150, 100),
          config
        )
      );
    }
  });

  window.diagram = diagram;
};
