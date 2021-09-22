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
export declare const BUILTIN_ACTIONS: {
    DELETE_SELECTED: string;
    MOVE_UP: string;
    MOVE_DOWN: string;
    MOVE_LEFT: string;
    MOVE_RIGHT: string;
};
/**
 *  if The ActionHandler run as expected , return true
 *  otherwise return false
 */
export declare type ActionHandler = (diagram: EzDiagram) => boolean;
/**
 *  register default diagram actions
 */
export declare class EzDiagramActions {
    diagram: EzDiagram;
    actions: Map<string, ActionHandler>;
    constructor(diagram: EzDiagram);
    /**
     * execute action with given action type
     * @param actionType
     * @returns
     */
    execute(actionType: string): boolean;
    /**
     * register action handler
     * @param actionType
     * @param handler
     */
    register(actionType: string, handler: ActionHandler): void;
    private get _selected();
    private _registerBuiltinActions;
    /**
     * delete selected elements on a diagram
     * @param diagram
     */
    private _deleteSelected;
    /**
     * move up selected elements on a diagram
     * @param diagram
     */
    private _moveUpSelected;
    /**
     * move down selected elements on a diagram
     * @param diagram
     */
    private _moveDownSelected;
    /**
     * move left selected elements on a diagram
     * @param diagram
     */
    private _moveLeftSelected;
    /**
     * move right selected elements on a diagram
     * @param diagram
     */
    private _moveRightSelected;
}
