export class EzPoint {
    x:number;

    y:number;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    translate(point:EzPoint):EzPoint {
        this.x+= point.x;
        this.y+= point.y;
        return this;
    }

    clone():EzPoint{
        return new EzPoint(this.x, this.y);
    }
}