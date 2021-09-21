import { EzPoint } from './point';

export class EzRectangle {
    x:number;

    y:number;

    width:number;

    height:number;

    constructor(x:number, y:number, width:number, height:number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     *  return center point 
     */
    center():EzPoint {
        return new EzPoint(this.x+this.width/2, this.y+this.height/2);
    }

    clone():EzRectangle {
        return new EzRectangle(this.x, this.y, this.width, this.height);
    }

    plain():{x:number, y:number, width:number, height:number}{
        return {
            x:this.x, y:this.y, width:this.width, height:this.height
        };
    }

    grow(expanding:number):EzRectangle {
        this.x-=expanding/2;
        this.y-=expanding/2;
        this.width+=expanding;
        this.height+=expanding;
        return this;
    }

    add(rect:EzRectangle):EzRectangle {
        const minX = Math.min(this.x, rect.x);
        const maxX = Math.max(this.x+this.width, rect.x+rect.width);
        const minY = Math.min(this.y, rect.y);
        const maxY = Math.max(this.y+this.height, rect.y+rect.height);
        this.x = minX;
        this.y = minY;
        this.width = maxX - minX;
        this.height = maxY - minY;
        return this;
    }

    static scale({
x, y, width, height
}:EzRectangle, scale:number):EzRectangle{
        if(__DEV__){
            if(scale <= 0){
                console.error('scale for EzRectangle should larger than 0, got ', scale);
            }
        }
        const w = width * scale;
        const h = height * scale;
        return new EzRectangle(x+width*(1-scale), y+height*(1-scale), w, h);
    }

    static translate({
x, y, width, height
}:EzRectangle, distance:EzPoint):EzRectangle {
        return new EzRectangle(x+distance.x, y+distance.y, width, height);
    }
}