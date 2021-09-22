import { Plugin } from "../../ez-diagram-esm/ez-diagram-esm.js";

class VertexAttributePlugin extends Plugin.EzDiagramPlugin {
  panel;
  toFront;
  toBottom;

  canActivate() {
    return true;
  }

  onChangeSelection() {
    const selected = this.context.selectedViewStates;
    if (selected?.length === 1 && selected[0]) {
      this.panel.style.display = "block";
    } else {
      this.panel.style.display = "none";
    }
  }

  onRendered() {
    if (this.toFront) {
      this.toFront.removeEventListener("click", this._toFront);
    }

    if (this.toBottom) {
      this.toBottom.removeEventListener("click", this._toBottom);
    }

    this.panel = document.querySelector(".vertex-attributes-editor");
    this.toFront = document.getElementById("to-front");
    this.toBottom = document.getElementById("to-bottom");
    this.toFront.addEventListener("click", this._toFront);
    this.toBottom.addEventListener("click", this._toBottom);
  }

  _toFront = () => {
    this.diagram.toFront(this.context.selectedViewStates[0].node);
  };

  _toBottom = () => {
    this.diagram.toBottom(this.context.selectedViewStates[0].node);
  };
}

export const applyVertexAttributePlugin = (diagram) => {
  diagram.pluginManager.use(
    "vertexAttributePlugin",
    new VertexAttributePlugin(diagram, diagram.pluginManager.getContext()),
    true
  );
};
