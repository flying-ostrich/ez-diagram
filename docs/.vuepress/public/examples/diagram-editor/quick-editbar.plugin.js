import {
  EzDiagramPlugin,
  EzElement,
} from "../../ez-diagram-esm/ez-diagram-esm.js";

export default class QuickEditbarPlugin extends EzDiagramPlugin {
  constructor(diagram, context) {
    super(diagram, context);
    this._generateTemplate();
  }

  canActivate() {
    return this.context.selectedViewStates?.length;
  }

  onClick() {}

  _generateTemplate() {
    const frag = document.createElement("div");
    const editbarHTML = `
        <div class="editbar-container">
            <div class="editbar-item font-size">FontSize</div>
            <div class="editbar-item font-color">FontColor</div>
            <div class="editbar-item to-top">ToTop</div>
            <div class="editbar-item to-bottom">ToBottom</div>
        </div>
    `;
    frag.innerHTML = editbarHTML;
    document
      .querySelector(".quick-edit-container")
      .appendChild(frag.firstElementChild);
  }
}
