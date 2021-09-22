import { EzDiagram } from '../diagram/diagram';
import { EzDiagramPluginManager } from '../plugin';
import { EzDiagramView } from '../view';
import { EzViewState } from '../view/view/view-state';
export interface EzMouseEvent {
    evt: MouseEvent;
    state: EzViewState;
}
export declare class EzEvent {
    _diagram: EzDiagram;
    _view: EzDiagramView;
    _pluginManager: EzDiagramPluginManager;
    _isMouseDown: boolean;
    constructor(diagram: EzDiagram, view: EzDiagramView);
    setupEventSystem(container: Element): void;
    setupRootListeners(container: Element): void;
    mouseHandler(evt: MouseEvent): void;
    private _mouseDown;
    private _mouseMove;
    private _mouseUp;
    private _click;
    private _dblclick;
    private _pressMove;
    private _callHooks;
}
