import { Plugin } from "../../ez-diagram-esm/ez-diagram-esm.js";

export const ORG_LAYOUT_PLUGIN = "ORG_LAYOUT_PLUGIN";
export class OrgLayoutPlugin extends Plugin.EzDiagramPlugin {
  canActivate() {
    return true;
  }

  onMouseUp({ state }) {
    this._redraw(state);
  }
  onResizeVertex({ state }) {
    this._redraw(state);
  }

  _redraw(state) {
    if (state) {
      setTimeout(() => {
        this.diagram.executeLayouts();
      }, 50);
    }
  }
}
