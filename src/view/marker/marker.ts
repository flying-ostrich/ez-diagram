import { EzElement } from '../canvas/ez-element';

export declare type MarkerShapeGetter = ()=>Element;

export class EzMarker {

    public markerWidth:number;

    public markerHeight:number;

    public refX:number;

    public refY:number;

    public markerNode:SVGMarkerElement;

    constructor(markerWidth:number, markerHeight:number, refX:number, refY:number, shapeGetter:MarkerShapeGetter){
        this.markerWidth = markerWidth;
        this.markerHeight = markerHeight;
        this.refX = refX;
        this.refY = refY;
        this.drawMarker();
        this.markerNode.appendChild(shapeGetter());
    }

    private drawMarker():void {
        this.markerNode = EzElement.el('marker').attr({
            markerWidth:this.markerWidth,
            markerHeight:this.markerHeight,
            refX:this.refX,
            refY:this.refY,
            orient:'auto-start-reverse'
        }, false).el as SVGMarkerElement;
    }

}