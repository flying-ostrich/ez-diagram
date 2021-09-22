import { EzMouseEvent } from '../../event/event';
import { EzRectangle } from '../../model';
import { EzElement } from '../../view';
import { EzVertexViewState } from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
import { HandlerRects, ResizeBend } from '../handler-dom';
/**
 *  handle move 、 rotate 、 resize action for single selected vertex
 */
export declare class SingleVertexHandler extends EzDiagramPlugin {
    selected: EzVertexViewState;
    /** selected bounding box with nine resize bends */
    handlerEl: EzElement;
    resizeAnchors: ResizeBend;
    handlerRects: HandlerRects;
    rotationHandler: EzElement;
    private _startPoint;
    private _handlerAction;
    private _resizeAnchor;
    private _startAngle;
    private _deltaAngle;
    get handlerBounds(): EzRectangle;
    canActivate(): boolean;
    onMouseDown({ evt }: EzMouseEvent): void;
    onPressMove({ evt }: EzMouseEvent): void;
    onMouseUp({ evt }: EzMouseEvent): void;
    afterViewUpdate(): void;
    onDeActivate(): void;
    onChangeSelection(): void;
    private _destroy;
    private _reset;
    private _getHandlerAction;
    private _createHandlerEl;
    private _updateHandlerEl;
    private _getMoveDistance;
    private _getAngleRelateToStateBounds;
}
