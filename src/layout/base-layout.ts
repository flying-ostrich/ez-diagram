import { EzVertex } from '../model';
import { EzDiagramNode } from '../model/diagram-node';
import { EzDiagramPlugin } from '../plugin';

export abstract class BaseLayout extends EzDiagramPlugin {
    layoutRoot:EzVertex;

    layoutNodes:EzDiagramNode[] = [];

    execute(node:EzVertex):void {
        this.layoutRoot = node;
        this._getLayoutNodes();
        this.executeLayout();
        this.updateViewStates();
    }

    private _getLayoutNodes():void {
        this.layoutNodes.length = 0;
        this.layoutNodes.push(this.layoutRoot);
        const visit = (parentNode:EzVertex) =>{
            const children = parentNode.layoutChildren;
            parentNode.edges?.forEach(c=>{
                this.layoutNodes.push(c);
            });
            children.forEach(c=>{
                this.layoutNodes.push(c);
                visit(c);
            });
        };
        visit(this.layoutRoot);
    }

    canActivate() {
        return true;
    }

    abstract executeLayout():void;

    abstract updateViewStates():void;
}