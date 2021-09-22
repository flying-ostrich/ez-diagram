import { EzDiagram } from '../../diagram/diagram';
import { EzMouseEvent } from '../../event/event';
import { EzPoint, EzRectangle } from '../../model';
import { EzViewState } from '../../view/view/view-state';
import { EzDiagramPlugin, EzPluginContext } from '../diagram-plugin';
/**
 *  selection plugin is a built in plugin that handles element selection in a diagram,for example:
 *  + if you click on a single element(edge or vertex) , the element will be selected and will be placed in the {@link EzDiagramPluginManager.pluginContext}
 *  + if you use mouse dragging to select multiple elements, those elements will  also be placed in the {@link EzDiagramPluginManager.pluginContext}
 *
 *  access the selected element via:
 *  ```javascript
 *     // diagram is instance of EzDiagram
 *     const selected = diagram.pluginManager.getContext().selectedViewStates;
 *  ```
 */
export declare class SelectPlugin extends EzDiagramPlugin {
    static SELECTION_BOX_TOLERANCE: number;
    startPoint: EzPoint;
    selectionBox: Element;
    selectionArea: EzRectangle;
    constructor(diagram: EzDiagram, context: EzPluginContext);
    get selected(): EzViewState[];
    canActivate(): boolean;
    private createSelectionBox;
    private getInterSelectionStates;
    onMouseDown({ state, evt }: EzMouseEvent): void;
    onPressMove({ state, evt }: EzMouseEvent): void;
    onMouseUp({ state }: {
        state: any;
    }): void;
    /**
     *  check removing state is currently selected , if true , remove it from selected states
     */
    onRemoveState(state: EzViewState): void;
    /**
     * change current selected states
     * @param selectedStates
     */
    changeSelection(selectedStates: EzViewState[]): void;
    private isHandlerEvent;
}
