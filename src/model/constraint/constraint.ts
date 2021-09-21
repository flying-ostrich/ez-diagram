import { EzDirection } from '../../constants';

/**
 * EzConstaint defined how a side of edge connect to it's terminal vertex
 * The Ezcontaint use four properties to define the connection releationship
 * between edge and vertex: percentX / percentY / offsetX / offsetY  
 * for example:  
 * ```
 *   // the following constraint indicates one edge should connect the center point of it's terminal
 *   let contraint = new EzConstraint(0.5,0.5,0,0);
 *   // the following constraint indicates one edge should connect the top-left corner with 5 pixel offset on x axis
 *   let contraint = new EzConstraint(0,0,5,0);
 * ```
 * 
 */
export class EzConstraint {
    percentX=0;

    percentY=0;

    offsetX=0;

    offsetY=0;

    constructor(percentX:number, percentY:number, offsetX?:number, offsetY?:number){
        if(__DEV__){
            if(percentX<0||percentX>1){
                console.error(`EzConstraint:invalid param.note 0<= percentX<=1, got ${percentX} `);
            }
            if(percentY<0||percentY>1){
                console.error(`EzConstraint:invalid param.note 0<= percentY<=1, got ${percentY} `);
            }
        }
        this.percentX = percentX;
        this.percentY = percentY;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
    }

    static createByDirection(direction:EzDirection):EzConstraint {
        switch(direction){
        case EzDirection.LEFT:
            return new EzConstraint(0, 0.5);
        case EzDirection.TOP:
            return new EzConstraint(0.5, 0);
        case EzDirection.RIGHT:
            return new EzConstraint(1, 0.5);
        case EzDirection.BOTTOM:
            return new EzConstraint(0.5, 1);
        }
    }
}