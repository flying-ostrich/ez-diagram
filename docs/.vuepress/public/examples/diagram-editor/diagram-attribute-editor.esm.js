import { EzPoint, Plugin } from "../../ez-diagram-esm/ez-diagram-esm.js";

class EditorAttributePlugin extends Plugin.EzDiagramPlugin {
  panel;
  bgToggle;
  scaleModifier;
  translateX;
  translateY;

  canActivate() {
    return true;
  }

  onChangeSelection() {
    const selected = this.context.selectedViewStates;
    if (selected?.length) {
      this.panel.style.display = "none";
    } else {
      this.panel.style.display = "block";
    }
  }

  onRendered() {
    if (this.scaleModifier) {
      this.scaleModifier.removeEventListener(
        "change",
        this._scaleModifierListener
      );
    }
    if (this.bgToggle) {
      this.bgToggle.removeEventListener("change", this._bgToggleListener);
    }

    if (this.translateX) {
      this.translateX.removeEventListener(
        "change",
        this._translateChangeListener
      );
    }

    if (this.translateY) {
      this.translateY.removeEventListener(
        "change",
        this._translateChangeListener
      );
    }

    this.panel = document.querySelector(".diagram-attributes-editor");

    this.scaleModifier = document.getElementById("scale");
    this.scaleModifier.addEventListener("change", this._scaleModifierListener);

    this.bgToggle = document.getElementById("grid-bg");
    this.bgToggle.addEventListener("change", this._bgToggleListener);

    this.translateX = document.getElementById("translate-x");
    this.translateY = document.getElementById("translate-y");
    this.translateX.addEventListener("change", this._translateChangeListener);
    this.translateY.addEventListener("change", this._translateChangeListener);
    this.translateX.value = this.diagram.view.getTranslate().x;
    this.translateY.value = this.diagram.view.getTranslate().y;
  }

  _scaleModifierListener = (evt) => {
    const val = +evt.target.value;
    diagram.zoomTo(val);
  };

  _bgToggleListener = (evt) => {
    const checked = evt.target.checked;
    const diagram = this.diagram;
    if (checked) {
      this.diagram.pluginManager.use(
        Plugin.BUILTIN_PLGUIN.BACKGROUND,
        new Plugin.EzBackGround(diagram, diagram.pluginManager.getContext()),
        true
      );
    } else {
      diagram.pluginManager.remove(Plugin.BUILTIN_PLGUIN.BACKGROUND);
    }
  };

  _translateChangeListener = (evt) => {
    const x = +this.translateX.value;
    const y = +this.translateY.value;
    this.diagram.setTranslate(new EzPoint(x, y));
  };
}

export const applyEditorAttributePlugin = (diagram) => {
  diagram.pluginManager.use(
    "editorAttributePlugin",
    new EditorAttributePlugin(diagram, diagram.pluginManager.getContext()),
    true
  );
};
