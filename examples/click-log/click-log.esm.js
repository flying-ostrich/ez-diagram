import {
  BUILTIN_MARKER,
  BUILTIN_SHAPE,
  EzDiagram, EzPoint, EzRectangle,
} from "../../ez-diagram-esm/ez-diagram-esm.js";
import {
  addEdge,
  addVertex
} from './../util.js'
import { ClickLogPlugin } from "./click-log.plugin.js";

const container = document.querySelector(".container");
const diagram = new EzDiagram(container, { background: true });

// register plugin
diagram.pluginManager.use(ClickLogPlugin.NAME,new ClickLogPlugin(diagram,diagram.pluginManager.getContext()));
// add nodes to diagram
addVertex(diagram,BUILTIN_SHAPE.RECTANGLE,new EzRectangle(50,100,200,100),'rect 1');
addVertex(diagram,BUILTIN_SHAPE.RECTANGLE,new EzRectangle(300,100,200,100),'rect 1');
addEdge(diagram,[new EzPoint(50,250),new EzPoint(500,250)],BUILTIN_MARKER.SQUARE,BUILTIN_MARKER.TRIANGLE);


window.diagram = diagram;
diagram.render();
