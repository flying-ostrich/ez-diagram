import { EzMouseEvent } from '../../event/event';
import { EzViewState } from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
/**
 *   handle move and change edge points for single selected {@link EzLineShape}
 */
export declare class SingleLineHandler extends EzDiagramPlugin {
    private handlerAction;
    private isPressMove;
    private selected;
    private bends;
    private virtualBends;
    private shapeEl;
    private startPoint;
    private movingDistance;
    private bendIndex;
    canActivate(): boolean;
    onDeActivate(): void;
    onChangeSelection(_: any, next: EzViewState[]): void;
    onDblClick({ evt }: EzMouseEvent): void;
    onMouseDown({ evt }: EzMouseEvent): void;
    onPressMove({ evt }: EzMouseEvent): void;
    onMouseUp({ evt }: EzMouseEvent): void;
    afterViewUpdate(): void;
    private getHandlerAction;
    private generateBends;
    private destroyBends;
    private reset;
}
