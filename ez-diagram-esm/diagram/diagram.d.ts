import { EzDiagramView } from '../view/view/view';
import { EzVertex } from '../model/vertex/vertex';
import { EzModel } from '../model/model';
import { EzDiagramPluginManager } from '../plugin';
import { EzElement, EzShapeConstructor } from '../view';
import { EzEdge, EzPoint } from '../model';
import { EzConfigManager } from '../config/config';
import { HotkeyHandler } from '../plugin/hot-key';
import { EzDiagramActions } from './actions';
import { EzDiagramNode } from '../model/diagram-node';
import { EzLayoutManager } from '../layout/layout-manager';
import { EzEdgeStyleOptions, EzVertexStyleOptions } from '../view/style/style';
interface EzDiagramOpts {
    background?: string;
}
export declare class EzDiagram {
    model: EzModel;
    container: EzElement;
    options: EzDiagramOpts;
    /**
     *  holds all registered plugins
     */
    pluginManager: EzDiagramPluginManager;
    /**
     * holds default configs for current diagram.
     * also, it supply methods to changes default configs
     */
    configManager: EzConfigManager;
    /**
     * holds all built in layouts for current diagram.
     * also ,  it supply methods to add or modify layout
     */
    layoutmanager: EzLayoutManager;
    /**
     * provides a esay way to bind or unbind hotkey shortcuts
     * for diagram
     * `
     *   // delete a diagram element while press ctrl + x
     *   // TODO
     * `
     */
    keyHandler: HotkeyHandler;
    /**
     * holds default diagram actions
     */
    actions: EzDiagramActions;
    view: EzDiagramView;
    constructor(container: Element, opts?: EzDiagramOpts);
    /**
     * clear container and render svg element
     */
    render(): void;
    private _applyBuiltInPlugins;
    private _applyBuiltInLayouts;
    zoomIn(zoomStep: number, centerPoint: EzPoint): void;
    zoomOut(zoomStep: number, centerPoint: EzPoint): void;
    /**
     * zooms the diagram to the given scale with an center argument
     * @param scale
     * @param centerPoint
     */
    zoomTo(scale: number, centerPoint?: EzPoint): void;
    /**
     * execute layout for all layout root nodes
     */
    executeLayouts(): void;
    /**
     * get center point of current view
     * @returns
     */
    getViewCenter(): EzPoint;
    /**
     * move the diagram with the given offset
     * @param offset
     */
    translate(offset: EzPoint): void;
    setTranslate(translate: EzPoint): void;
    /**
     * add a vertex to model
     * @param vertex
     */
    addVertex(vertex: EzVertex): void;
    /**
     * add a edge to model
     * @param edge
     * @param parent - default parent is model root
     */
    addEdge(edge: EzEdge): void;
    /**
     * clear all selected diagram elements
     */
    clearSelection(): void;
    /**
     * move the given diagram node to front
     * @param node
     */
    toFront(node: EzDiagramNode): void;
    /**
     * move the given diagram node to bottom
     * @param node
     */
    toBottom(node: EzDiagramNode): void;
    /**
     *
     * @param vertex
     * @param style
     */
    setVertexStyle(vertex: EzVertex, style: EzVertexStyleOptions): void;
    /**
     *
     * @param edge
     * @param style
     */
    setEdgeStyle(edge: EzEdge, style: EzEdgeStyleOptions): void;
    registerShape(shapeName: string, shape: EzShapeConstructor): void;
    destroy(): void;
}
export {};
