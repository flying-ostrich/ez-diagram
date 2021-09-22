import { EzDiagram, Plugin } from "../../ez-diagram-esm/ez-diagram-esm.js";
import { applyEditorAttributePlugin } from "./diagram-attribute-editor.esm.js";
import { applyShapeSelector } from "./shape-selector.esm.js";
import { applyVertexAttributePlugin } from "./vertex-attribute-editor.esm.js";

window.onload = function() {
  // create diagram instance
  const container = document.querySelector(".container");
  const diagram = new EzDiagram(container,{background:true});
  const hotKeyPlugin = diagram.pluginManager.get(Plugin.BUILTIN_PLGUIN.HOT_KEY);
  hotKeyPlugin.isValidKeyEvent = function(event) {
    if (!this.context.selectedViewStates?.length) {
      return false;
    }
  };

  applyShapeSelector(diagram);
  applyEditorAttributePlugin(diagram);
  applyVertexAttributePlugin(diagram);
};
