import { EzVertex } from '../model';
import { EzDiagramNode } from '../model/diagram-node';
import { EzDiagramPlugin } from '../plugin';
export declare abstract class BaseLayout extends EzDiagramPlugin {
    layoutRoot: EzVertex;
    layoutNodes: EzDiagramNode[];
    execute(node: EzVertex): void;
    private _getLayoutNodes;
    canActivate(): boolean;
    abstract executeLayout(): void;
    abstract updateViewStates(): void;
}
