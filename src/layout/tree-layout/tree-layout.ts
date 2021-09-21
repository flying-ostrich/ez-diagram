import { EzDirection } from '../../constants';
import { EzRectangle, EzVertex} from '../../model';
import { STATE_WORK_TYPE } from '../../view/view/view-state';
import { BaseLayout } from '../base-layout';


export interface TreeLayoutConfig {
    nodeSpacing?:number;
    layerSpacing?:number;
}

export class TreeLayout extends BaseLayout {
    private _direction = EzDirection.BOTTOM;

    private _config:TreeLayoutConfig = {nodeSpacing:20, layerSpacing:30};

    private get _isVertical():boolean {
        return this._direction === EzDirection.TOP || this._direction===EzDirection.BOTTOM;
    }


    updateLayoutNodes():void {
        const updateChildren = (parent:EzVertex, layer:number) =>{
            const children= parent.layoutChildren.filter(c=>c.layoutDirection === this._direction);
            if(!children.length) return;
            const getMinPosition = ():number => {
                const center = parent.bounds.center()[this._isVertical?'x':'y'];
                const totalLength = children.reduce((total:number, child:EzVertex)=>{
                    return total + child['layoutLength'];
                }, (children.length-1) * this._config.nodeSpacing);
                return center - totalLength / 2;
            };

            const model = this.diagram.model;
            let xMin:number;
            let yMin:number;
            let nextLayer:number;
            switch(this._direction){
            case EzDirection.LEFT:
                yMin = getMinPosition();
                nextLayer = layer - Math.max(...children.map(c=>c.bounds.width)) - this._config.layerSpacing;
                children.forEach((child)=>{
                    model.updateBounds(child, new EzRectangle(layer-child.bounds.width, yMin+(child['layoutLength']-child.bounds.height)/2, child.bounds.width, child.bounds.height));
                    yMin += (child['layoutLength'] + this._config.nodeSpacing);
                    if(child.layoutChildren?.length){
                        updateChildren(child, nextLayer);
                    }
                });
                break;
            case EzDirection.TOP:
                xMin = getMinPosition();
                nextLayer = layer - Math.max(...children.map(c=>c.bounds.height)) - this._config.layerSpacing;
                children.forEach((child)=>{
                    model.updateBounds(child, new EzRectangle(xMin+(child['layoutLength']-child.bounds.width)/2, layer - child.bounds.height, child.bounds.width, child.bounds.height));
                    xMin += (child['layoutLength'] + this._config.nodeSpacing);
                    if(child.layoutChildren?.length){
                        updateChildren(child, nextLayer);
                    }
                });

                break;
            case EzDirection.RIGHT:
                yMin = getMinPosition();
                nextLayer = layer + Math.max(...children.map(c=>c.bounds.width)) + this._config.layerSpacing;
                children.forEach((child)=>{
                    model.updateBounds(child, new EzRectangle(layer, yMin+(child['layoutLength']-child.bounds.height)/2, child.bounds.width, child.bounds.height));
                    yMin += (child['layoutLength'] + this._config.nodeSpacing);
                    if(child.layoutChildren?.length){
                        updateChildren(child, nextLayer);
                    }
                });
                break;
            case EzDirection.BOTTOM: 
                xMin = getMinPosition();
                nextLayer = layer + Math.max(...children.map(c=>c.bounds.height)) + this._config.layerSpacing;
                children.forEach((child)=>{
                    model.updateBounds(child, new EzRectangle(xMin+(child['layoutLength']-child.bounds.width)/2, layer, child.bounds.width, child.bounds.height));
                    xMin += (child['layoutLength'] + this._config.nodeSpacing);
                    if(child.layoutChildren?.length){
                        updateChildren(child, nextLayer);
                    }
                });
                break;
            }

            children.forEach(child=>{
                const edges = child.edges.filter(edge=>edge.target===child);
                edges.forEach(edge=>{
                    switch(this._direction){
                    case EzDirection.LEFT:
                        this.diagram.model.changeConstraint(edge, EzDirection.LEFT, true);
                        this.diagram.model.changeConstraint(edge, EzDirection.RIGHT, false);
                        break;
                    case EzDirection.TOP:
                        this.diagram.model.changeConstraint(edge, EzDirection.TOP, true);
                        this.diagram.model.changeConstraint(edge, EzDirection.BOTTOM, false);
                        break;
                    case EzDirection.RIGHT:
                        this.diagram.model.changeConstraint(edge, EzDirection.RIGHT, true);
                        this.diagram.model.changeConstraint(edge, EzDirection.LEFT, false);
                        break;
                    case EzDirection.BOTTOM:
                        this.diagram.model.changeConstraint(edge, EzDirection.BOTTOM, true);
                        this.diagram.model.changeConstraint(edge, EzDirection.TOP, false);
                        break;
                    }
                });
            });  
        };

        let layerStart:number;
        const rootBounds = this.layoutRoot.bounds;
        switch(this._direction){
        case EzDirection.TOP:
            layerStart = rootBounds.y - this._config.layerSpacing;
            break;
        case EzDirection.BOTTOM:
            layerStart = rootBounds.y + rootBounds.height + this._config.layerSpacing;
            break;
        case EzDirection.LEFT:
            layerStart = rootBounds.x - this._config.layerSpacing;
            break;
        case EzDirection.RIGHT:
            layerStart = rootBounds.x+rootBounds.width + this._config.layerSpacing;
            break;
        }
        updateChildren(this.layoutRoot, layerStart);

    }


    executeLayout(){
        [EzDirection.TOP, EzDirection.BOTTOM, EzDirection.LEFT, EzDirection.RIGHT].forEach(direction=>{
            this._direction = direction;
            const updateLayerNodes = (parent:EzVertex):number=>{
                const children= parent.layoutChildren.filter(c=>c.layoutDirection === this._direction);
                const pLength = this._isVertical ? parent.bounds.width:parent.bounds.height;

                if(!children.length) pLength;

                const cLength = children.reduce((prev, cur)=>{
                    return prev+updateLayerNodes(cur);
                }, (children.length-1) * this._config.nodeSpacing);
                const len = Math.max(pLength, cLength);
                parent['layoutLength'] = len;
                return len;
            };

            updateLayerNodes(this.layoutRoot);
            this.updateLayoutNodes();
        });
    }

    updateViewStates(){
        this.layoutNodes.forEach(node=>{
            const state = this.diagram.view.stateMapping.get(node.id);
            state.updateWork = STATE_WORK_TYPE.UPDATE_FROM_MODEL;
        });
    }
}