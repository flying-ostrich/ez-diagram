import { EzMouseEvent } from '../../event/event';
import { EzDiagramPlugin } from '../diagram-plugin';
export declare class EdgeGenerator extends EzDiagramPlugin {
    private _handlerElement;
    private _constraintGrow;
    private _constraintPoint;
    private _constraint;
    private _constraintPoints;
    private _tempEdge;
    private _currentVertex;
    private _targetConstraints;
    /** selected vertex */
    private get selected();
    private get state();
    beforeCallingHook({ evt }: EzMouseEvent): void;
    onMouseDown({ evt }: EzMouseEvent): void;
    onMouseMove({ evt, state }: EzMouseEvent): void;
    onMouseUp({ evt }: EzMouseEvent): void;
    onChangeSelection(): void;
    private _setSelectPluginDisabled;
    private _getTargetConstraintInfo;
    private _isEdgeGenerateBend;
    private _reset;
}
