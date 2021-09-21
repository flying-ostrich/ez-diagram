import { EzPoint } from '../model';
import { EzVertexViewState, EzViewState } from '../view/view/view-state';
import { EzDiagram } from './diagram';


/**
 *   DELETE_SELECTED:  delete selected elements  
 * 
 *   MOVE_UP:  move up selected elements   
 * 
 *   MOVE_DOWN: move down selected elements   
 * 
 *   MOVE_LEFT: move left selected elements   
 * 
 *   MOVE_RIGHT: move right selected elements   
 */
export const BUILTIN_ACTIONS = {
    DELETE_SELECTED:'DELETE_SELECTED', 
    MOVE_UP:'MOVE_UP', 
    MOVE_DOWN:'MOVE_DOWN', 
    MOVE_LEFT:'MOVE_LEFT', 
    MOVE_RIGHT:'MOVE_RIGHT' 
};

/**
 *  if The ActionHandler run as expected , return true 
 *  otherwise return false
 */
export type ActionHandler = (diagram:EzDiagram) => boolean;

/**
 *  register default diagram actions 
 */
export class EzDiagramActions {
    diagram:EzDiagram;

    actions = new Map<string, ActionHandler>();

    constructor(diagram:EzDiagram){
        this.diagram = diagram;
        this._registerBuiltinActions();
    }

    /**
     * execute action with given action type
     * @param actionType 
     * @returns 
     */
    public execute(actionType:string):boolean {
        const actionHandler = this.actions.get(actionType);
        if(!actionHandler){
            if(__DEV__){
                console.error(`EzDiagramActions:execute no registered action handler found for action type : ${actionType}`);
            }
            return false;
        }

        const result = actionHandler(this.diagram);
        return result;
    }

    /**
     * register action handler
     * @param actionType 
     * @param handler 
     */
    public register(actionType:string, handler:ActionHandler):void {
        this.actions.set(actionType, handler);
    }

    private get _selected(): EzViewState[] {
        return this.diagram.pluginManager.getContext()?.selectedViewStates;
    }

    private _registerBuiltinActions():void {
        this.actions.set(BUILTIN_ACTIONS.DELETE_SELECTED, this._deleteSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_LEFT, this._moveLeftSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_UP, this._moveUpSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_RIGHT, this._moveRightSelected);
        this.actions.set(BUILTIN_ACTIONS.MOVE_DOWN, this._moveDownSelected);
    }

    /**
     * delete selected elements on a diagram
     * @param diagram 
     */
    private _deleteSelected:ActionHandler = (diagram:EzDiagram):boolean=>{
        if(!this._selected.length) return false;
        
        diagram.view.removeStates(this._selected);
        return true;
    }

    /**
     * move up selected elements on a diagram
     * @param diagram 
     */
    private _moveUpSelected:ActionHandler = (diagram:EzDiagram):boolean=> {
        if(!this._selected.length) return false;

        const view = diagram.view;
        const distance = new EzPoint(0, -10);
        this._selected.forEach(state=>{
            if(state instanceof EzVertexViewState){
                view.moveVertex(state, distance);
            }else {
                view.moveEdge(state, distance);
            }
        });
        return true;
    }

    /**
     * move down selected elements on a diagram
     * @param diagram 
     */
    private _moveDownSelected:ActionHandler = (diagram:EzDiagram):boolean=> {
        const view = diagram.view;
        const distance = new EzPoint(0, 10);
        this._selected.forEach(state=>{
            if(state instanceof EzVertexViewState){
                view.moveVertex(state, distance);
            }else {
                view.moveEdge(state, distance);
            }
        });
        return true;
    }

    /**
     * move left selected elements on a diagram
     * @param diagram 
     */
    private _moveLeftSelected:ActionHandler = (diagram:EzDiagram):boolean=> {
        const view = diagram.view;
        const distance = new EzPoint(-10, 0);
        this._selected.forEach(state=>{
            if(state instanceof EzVertexViewState){
                view.moveVertex(state, distance);
            }else {
                view.moveEdge(state, distance);
            }
        });
        return true;
    }

    /**
     * move right selected elements on a diagram
     * @param diagram 
     */
    private _moveRightSelected:ActionHandler = (diagram:EzDiagram):boolean=> {
        const view = diagram.view;
        const distance = new EzPoint(10, 0);
        this._selected.forEach(state=>{
            if(state instanceof EzVertexViewState){
                view.moveVertex(state, distance);
            }else {
                view.moveEdge(state, distance);
            }
        });
        return true;
    }
}