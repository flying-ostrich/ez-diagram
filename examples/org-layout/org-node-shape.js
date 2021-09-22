import {
  EzVertexShape,
  EzElement,
  HTML_NAME_SPACE,
  SVG_NAME_SPACE,
} from "../../ez-diagram-esm/ez-diagram-esm.js";

export const ORG_NODE_SHAPE = "org-node-shape";
export class OrgNodeShape extends EzVertexShape {
  foreignObject;
  content;

  draw() {
    super.draw();

    const bounds = this.state.getBounds().plain();
    this.foreignObject = EzElement.el("foreignObject", SVG_NAME_SPACE).attr({
      ...bounds,
    });
    this.drawContent(this.state, bounds);
    this.foreignObject.appendChild(this.content);
    this.root.prependChild(this.foreignObject);
  }

  redraw() {
    super.redraw();

    const state = this.state.alternate || this.state;
    const bounds = state.getBounds().plain();
    this.drawContent(state, bounds);
    this.foreignObject.attr(bounds);
  }

  drawContent(state, bounds) {
    if (!this.content) {
      this.content = EzElement.el("div", HTML_NAME_SPACE);
    }
    let info = JSON.parse(state.node.text);
    this.content
      .style({
        display: "flex",
        alignItems: "center",
        width: bounds.width + "px",
        height: bounds.height + "px",
        border: "1px solid black",
        boxSizing: "border-box",
        borderRadius: "5px",
        userSelect: "none",
      })
      .html(
        `
        <img class="avatar" src="./../icons/user.svg" style="width:30%;"/>
        <div class="info">
            <div class="name">${info.name}</div>
            <div class="title" style="font-size:14px;">title:<span >${info.title}</span></div>
            <div class="id">id:<span>${info.id}</span></div>
        </div>
  `
      );
  }
}
