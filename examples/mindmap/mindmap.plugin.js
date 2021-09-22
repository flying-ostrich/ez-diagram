import { Plugin } from "../../ez-diagram-esm/ez-diagram-esm.js";

export const MINDMAP_PLGUIN = "MINDMAP_PLGUIN";
export class MindMapPlugin extends Plugin.EzDiagramPlugin {
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
