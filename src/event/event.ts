import { EzDiagram } from '../diagram/diagram';
import { EzDiagramPluginManager } from '../plugin';
import { EzDiagramView } from '../view';
import { EzViewState } from '../view/view/view-state';

export interface EzMouseEvent {
    evt:MouseEvent,
    state:EzViewState
}

export class EzEvent {
    _diagram:EzDiagram;

    _view:EzDiagramView;

    _pluginManager:EzDiagramPluginManager;

    _isMouseDown = false;

    constructor(diagram:EzDiagram, view:EzDiagramView){
        this._diagram = diagram;
        this._view = view;
        this._pluginManager = diagram.pluginManager;
    }

    setupEventSystem(container:Element){
        this.setupRootListeners(container);
    }

    setupRootListeners(container:Element):void{
        container.addEventListener('mousedown', this.mouseHandler.bind(this));
        container.addEventListener('mousemove', this.mouseHandler.bind(this));
        container.addEventListener('mouseup', this.mouseHandler.bind(this));
        container.addEventListener('click', this.mouseHandler.bind(this));
        container.addEventListener('dblclick', this.mouseHandler.bind(this));
    }

    mouseHandler(evt:MouseEvent):void {
        const view = this._diagram.view;
        const target = evt.target as Element;
        const state = view.getState(target);
        const type = evt.type;
        switch(type){
        case 'mousedown':
            this._isMouseDown = true;
            this._mouseDown({evt, state});
            break;
        case 'mousemove':
            this._mouseMove({evt, state});
            if(this._isMouseDown){
                this._pressMove({evt, state});
            }
            break;
        case 'mouseup':
            this._isMouseDown = false;
            this._mouseUp({evt, state});
            break;
        case 'click':
            this._click({evt, state});
            break;
        case 'dblclick':
            this._dblclick({evt, state});
            break;
        default:
            break;
        }
    }

    private _mouseDown(evt:EzMouseEvent):void{
        this._callHooks('onMouseDown', evt);
    }

    private _mouseMove(evt:EzMouseEvent):void{
        this._callHooks('onMouseMove', evt);
    }

    private _mouseUp(evt:EzMouseEvent):void {
        this._callHooks('onMouseUp', evt);
    }

    private _click(evt:EzMouseEvent):void {
        this._callHooks('onClick', evt);
    }

    private _dblclick(evt:EzMouseEvent):void {
        this._callHooks('onDblClick', evt);
    }

    private _pressMove(evt:EzMouseEvent):void {
        this._callHooks('onPressMove', evt);
    }

    private _callHooks(hookName:string, evt:EzMouseEvent):void {
        this._pluginManager.callHook('beforeCallingHook', evt);
        this._pluginManager.callHook(hookName, evt);
        if(evt.state){
            this._view.callShapeEventHook(evt.state, hookName);
        }
    }
}