import { EzDiagram } from '../diagram/diagram';
import { EzMouseEvent } from '../event/event';
import { EzPoint } from '../model';
import { EzDiagramNode } from '../model/diagram-node';
import { EzElement } from '../view';
import { EzVertexViewState, EzViewState } from '../view/view/view-state';

export class EzDiagramPlugin {
    active = true;

    disabled = false;

    diagram:EzDiagram;

    context:EzPluginContext;

    constructor(diagram:EzDiagram, context:EzPluginContext){
        this.diagram = diagram;
        this.context = context;
    }

    setDisabled(disabled:boolean):void {
        this.disabled = disabled;
    }

    /**
     * call before any plugin hook executes . 
     * such as disable a plugin
     * @param evt 
     */
    beforeCallingHook?( evt:EzMouseEvent):void;

    /**
     * this method defermine the plugin active status.
     * if return true , plugin hook will be correctly called , otherwise , hook will be disabled.
     * note that subclass can overwrite this method to determine plugin active status
     * @returns 
     */
    canActivate():boolean{
        return true;
    }

    onDeActivate(){}

    /**
     *  call after {@link EzDiagram} instance created. 
     */
    onCreate?():void;

    /**
     *  call after {@link EzDiagram} instance destroyed. 
     */
    onDestroy?():void;

    /**
     *  call after {@link EzDiagramView} rendered. 
     */
    onRendered?():void;

    beforeUpdate?(node:EzDiagramNode):void;

    afterUpdate?(node:EzDiagramNode):void;

    /**
     *  trigger before {@link EzDiagramView} update
     * @param diagram instance of {@link EzDiagram}
     */
    beforeViewUpdate?(diagram:EzDiagram):void;

    /**
     *  trigger after {@link EzDiagramView} update , this means this hook will be called after DOM is updated.
     * @param diagram instance of {@link EzDiagram}
     */
    afterViewUpdate?(diagram:EzDiagram):void;

    /**
     *  trigger after selection change
     */
    onChangeSelection?(prev:EzViewState[], next:EzViewState[]):void;

    /**
     *  trigger before diagram scale changes
     * @param prev  - previouse diagram scale
     * @param current - current diagram scale
     */
    onScaleDiagram?(prev:number, current:number):void ;

    /**
     *  trigger before diagram translate changes
     * @param prev  - previouse diagram translate
     * @param current - current diagram translate
     */
    onTranslateDiagram?(prev:EzPoint, current:EzPoint):void;

    /**
     *  trigger when the vertex is moving by user
     * @param state 
     */
    onMovingVertex?(state:EzVertexViewState):void;

    /**
     * trigger after the vertex is moved  by user
     * @param state 
     */
    onMoveVertex?(state:EzVertexViewState):void;

    /**
     * trigger when the vertex is rotating  by user
     * @param state 
     */
    onRotatingVertex?(state:EzVertexViewState):void;

    /**
     * trigger after the vertex is rotated  by user
     * @param state 
     */
    onRotateVertex?(state:EzVertexViewState):void;

    /**
     * trigger when the vertex is resizing  by user
     * @param state 
     */
    onResizingVertex?(state:EzVertexViewState):void;

    /**
     *  trigger after the vertex is resized  by user
     * @param state 
     */
    onResizeVertex?(state:EzVertexViewState):void;

    /**
     *  trigger after remove state from {@link EzDiagramView}
     * @param state 
     */
    onRemoveState?(state:EzViewState):void;

    /**
     *  trigger when start editing at a vertex element
     * @param state 
     */
    onStartEditing?(state:EzVertexViewState):void;

    /**
     * trigger when stop editing at a vertex element
     * @param state 
     */
    onStopEditing?(state:EzVertexViewState):void;
 
    onClick?(evt:EzMouseEvent):void;

    onDblClick?(evt:EzMouseEvent):void;

    onPressMove?(evt:EzMouseEvent):void;

    onMouseMove?(evt:EzMouseEvent):void;

    onMouseDown?(evt:EzMouseEvent):void;

    onMouseUp?(evt:EzMouseEvent):void;
}

export type BackGroundGenerator = (diagram:EzDiagram) => EzElement;

export interface EzPluginContext {
    selectedViewStates?:EzViewState[];
    background?: BackGroundGenerator;
}

