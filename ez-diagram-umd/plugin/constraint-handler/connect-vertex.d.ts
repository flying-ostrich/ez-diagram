import { EzMouseEvent } from '../../event/event';
import { EzVertexViewState } from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
export declare class ConnectVertex extends EzDiagramPlugin {
    private _terminalType;
    private _connectTolerence;
    private _constraintTolerence;
    private _constraintPoints;
    private _constraintPoint;
    private _constraint;
    private _targetVertex;
    private _targetConstraints;
    private _handlerElement;
    private get selected();
    private _getTerminalType;
    private _getTopMostIntersectedVertexState;
    private _generateConnectionPoints;
    private _handleConnectToConnectionPoint;
    private _destroyHandlerElement;
    canActivate(): boolean;
    onDeActivate(): void;
    onMouseDown({ evt }: EzMouseEvent): void;
    onPressMove({ evt }: EzMouseEvent): void;
    onMouseUp(): void;
    private _updateRelatedEdgeTerminalPoint;
    onMoveVertex(state: EzVertexViewState): void;
    onMovingVertex(state: EzVertexViewState): void;
    onRotateVertex(state: EzVertexViewState): void;
    onRotatingVertex(state: EzVertexViewState): void;
    onResizingVertex(state: EzVertexViewState): void;
    onResizeVertex(state: EzVertexViewState): void;
}
