import { EzDiagramView } from '../view/view/view';
import { EzVertex } from '../model/vertex/vertex';
import { EzModel } from '../model/model';
import { EzDiagramPluginManager } from '../plugin';
import { SelectPlugin } from '../plugin/selection-plugin/selection-plugin';
import { SingleVertexHandler } from '../plugin/single-vertex-handler/single-vertex-handler';
import {
 EzElement, EzShapeConstructor, HTML_NAME_SPACE 
} from '../view';
import { SingleLineHandler } from '../plugin';
import { EzBackGround } from '../plugin/background/background';
import { EzHotKey } from '../plugin/hot-key/hot-key';
import { EzEdge, EzPoint } from '../model';
import { ConnectVertex } from '../plugin/constraint-handler/connect-vertex';
import { VertexTextEditor } from '../plugin/vertex-text-editor/vertex-text-editor';
import { EzConfigManager } from '../config/config';
import { EdgeGenerator } from '../plugin/constraint-handler/edge-generator';
import { BUILTIN_PLGUIN } from '../plugin/constant';
import { HotkeyHandler } from '../plugin/hot-key';
import { EzDiagramPlugin } from '../plugin/diagram-plugin';
import { EzDiagramActions } from './actions';
import { EzDiagramNode } from '../model/diagram-node';
import { EzLayoutManager } from '../layout/layout-manager';
import { BUILTIN_LAYOUT } from '../layout/constant';
import { TreeLayout } from '../layout/tree-layout/tree-layout';
import { EzEdgeStyleOptions, EzVertexStyleOptions } from '../view/style/style';
import { STATE_WORK_TYPE } from '../view/view/view-state';


interface EzDiagramOpts {
    background?:string;
}

export class EzDiagram {
    model:EzModel;

    container:EzElement;

    options:EzDiagramOpts;

    /**
     *  holds all registered plugins
     */
    pluginManager = new EzDiagramPluginManager(this);

    /**
     * holds default configs for current diagram.
     * also, it supply methods to changes default configs
     */
    configManager = new EzConfigManager();

    /**
     * holds all built in layouts for current diagram.
     * also ,  it supply methods to add or modify layout
     */
    layoutmanager = new EzLayoutManager();

    /**
     * provides a esay way to bind or unbind hotkey shortcuts 
     * for diagram 
     * `
     *   // delete a diagram element while press ctrl + x
     *   // TODO
     * `
     */
    keyHandler = new HotkeyHandler();

    /**
     * holds default diagram actions
     */
    actions = new EzDiagramActions(this);

    view:EzDiagramView;

    constructor(container:Element, opts:EzDiagramOpts = {}){
        this.options = opts;
        this._applyBuiltInPlugins();
        this._applyBuiltInLayouts();
        this.container = EzElement.el(container, HTML_NAME_SPACE);
        this.view = new EzDiagramView(this);
        this.model = new EzModel();
        this.pluginManager.callHook('onCreate');
    }

    /**
     * clear container and render svg element
     */
    render(){
        this.executeLayouts();
        const svg = this.view.rerender();
        this.container.empty();
        this.container.appendChild(svg);
    }

    private _applyBuiltInPlugins():void {
        const ctx = this.pluginManager.getContext();
        const plugins:{name:string, plugin:EzDiagramPlugin}[] = [
                {name:BUILTIN_PLGUIN.SELECT, plugin: new SelectPlugin(this, ctx)},
                {name:BUILTIN_PLGUIN.SINGLE_LINE_HANDLER, plugin: new SingleLineHandler(this, ctx)},
                {name:BUILTIN_PLGUIN.EDGE_GENERATOR, plugin: new EdgeGenerator(this, ctx)},
                {name:BUILTIN_PLGUIN.SINGLE_VERTEX_HANDLER, plugin: new SingleVertexHandler(this, ctx)},
                {name:BUILTIN_PLGUIN.HOT_KEY, plugin: new EzHotKey(this, ctx)},
                {name:BUILTIN_PLGUIN.CONNECT_VERTEX, plugin: new ConnectVertex(this, ctx)},
                {name:BUILTIN_PLGUIN.VERTEX_TEXT_EDITOR, plugin: new VertexTextEditor(this, ctx)},
        ];

        //  use dynamic background here
        if(this.options.background) {
            plugins.push(
                {name:BUILTIN_PLGUIN.BACKGROUND, plugin: new EzBackGround(this, ctx)},
            );
        }
        
        plugins.forEach(({name, plugin})=>{
            this.pluginManager.use(name, plugin);
        });
    }

    private _applyBuiltInLayouts():void {
        const ctx = this.pluginManager.getContext();
        this.layoutmanager.use(BUILTIN_LAYOUT.TREE_LAYOUT, new TreeLayout(this, ctx));
    }

    zoomIn(zoomStep:number, centerPoint:EzPoint):void {
        const nextScale = this.view.getScale() + zoomStep;
        this.zoomTo(nextScale, centerPoint);
    }

    zoomOut(zoomStep:number, centerPoint:EzPoint):void {
        const nextScale = this.view.getScale() - zoomStep;
        this.zoomTo(nextScale, centerPoint);
    }

    /**
     * zooms the diagram to the given scale with an center argument
     * @param scale 
     * @param centerPoint 
     */
    zoomTo(scale:number, centerPoint:EzPoint = this.getViewCenter()){
        const lastScale = this.view.getScale();
        const step = scale/lastScale-1;
        const translate = new EzPoint(-(centerPoint.x*step/scale), -(centerPoint.y*step/scale));
        this.view.translate(translate);
        this.view.setScale(scale);
        this.view.markAllDirty();
    }

    /**
     * execute layout for all layout root nodes
     */
    executeLayouts(){
        const roots = this.model.getLayoutRoots();
        roots.forEach(root=>{
            const layout = root.layout;
            const layoutInst = this.layoutmanager.get(layout);
            if(!layoutInst){
                if(__DEV__){
                    console.warn(`layout ${layout} is not found`);
                }
                return;
            }
            layoutInst.execute(root);
        });
    }
    
    /**
     * get center point of current view
     * @returns 
     */
    getViewCenter():EzPoint {
        const vSize = this.view.size;
        return new EzPoint(vSize.left + vSize.width/2, vSize.top+vSize.height/2);
    }

    /**
     * move the diagram with the given offset
     * @param offset 
     */
    translate(offset:EzPoint): void {
        this.view.translate(offset);
        this.view.markAllDirty();
    }

    setTranslate(translate:EzPoint):void {
        this.view.setTranslate(translate);
        this.view.markAllDirty();
    }

    /**
     * add a vertex to model
     * @param vertex  
     */
    addVertex(vertex:EzVertex):void{
        this.model.addVertex(vertex);
        this.view.render();
    }

    /**
     * add a edge to model
     * @param edge 
     * @param parent - default parent is model root
     */
    addEdge(edge:EzEdge):void{
        this.model.addEdge(edge);
        this.view.render();
    }

    /**
     * clear all selected diagram elements
     */
    clearSelection():void {
        const selectPlugin = this.pluginManager.get(BUILTIN_PLGUIN.SELECT) as SelectPlugin;
        selectPlugin.changeSelection([]);
    }

    /**
     * move the given diagram node to front
     * @param node 
     */
    toFront(node:EzDiagramNode){
        this.view.changeOrder(node, this.model.nodes.length-1);
    }

    /**
     * move the given diagram node to bottom
     * @param node 
     */
    toBottom(node:EzDiagramNode){
        this.view.changeOrder(node, 0);
    }

    /**
     * 
     * @param vertex 
     * @param style 
     */
    setVertexStyle(vertex:EzVertex,style:EzVertexStyleOptions):void {
        Object.assign(vertex.style,style);
        const state = this.view.stateMapping.get(vertex.id);
        state.updateWork = STATE_WORK_TYPE.UPDATE_FROM_MODEL;
    }

    /**
     * 
     * @param edge 
     * @param style 
     */
    setEdgeStyle(edge:EzEdge,style:EzEdgeStyleOptions):void {
        Object.assign(edge.style,style);
        const state = this.view.stateMapping.get(edge.id);
        state.updateWork = STATE_WORK_TYPE.UPDATE_FROM_MODEL;
    }


    registerShape(shapeName:string, shape:EzShapeConstructor):void {
        this.view.shapeManager.registerShape(shapeName, shape);
    }

    destroy():void {
        // TODO do some clear work
        this.pluginManager.callHook('onDestroy');
    }

}