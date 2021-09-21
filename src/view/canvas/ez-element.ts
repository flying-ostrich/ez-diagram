import { EzPoint, EzRectangle } from '../../model';
import { camelCaseToHyphenCase } from '../../utils/utils';

export const SVG_NAME_SPACE = 'http://www.w3.org/2000/svg';
export const HTML_NAME_SPACE = 'http://www.w3.org/1999/xhtml';

export class EzElement {
    el:Element;

    bounds:EzRectangle;

    relativeMode = false;

    pathDefs:string[] = [];

    constructor(el:string | Element, xmlns = SVG_NAME_SPACE){
        if(el instanceof Element){
            this.el = el;
        }else {
            this.el = document.createElementNS(xmlns, el);
        }
    }

    beginPath(relativeMode:boolean, bounds?:EzRectangle):EzElement {
        this.bounds = bounds;
        this.relativeMode = relativeMode;
        return this;
    }

    moveTo(x:number, y:number):EzElement {
        const pt = this._transformedPt(x, y);
        this.pathDefs.push(`M${pt.x} ${pt.y}`);
        return this;
    }

    lineTo(x:number, y:number):EzElement {
        const pt = this._transformedPt(x, y);
        this.pathDefs.push(`L${pt.x} ${pt.y}`);
        return this;
    }

    curveTo(cx1:number, cy1:number, cx2:number, cy2:number, x:number, y:number):EzElement {
        const c1 = this._transformedPt(cx1, cy1);
        const c2 = this._transformedPt(cx2, cy2);
        const t = this._transformedPt(x, y);
        this.pathDefs.push(`C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${t.x} ${t.y}`);
        return this;
    }

    arcTo(rx:number, ry:number, rotation:number, largeArcFlag:0|1, sweepFlag:0|1, x:number, y:number):EzElement{
        const pt = this._transformedPt(x, y);
        this.pathDefs.push(`A${rx} ${ry} ${rotation} ${largeArcFlag} ${sweepFlag} ${pt.x} ${pt.y}`);
        return this;
    }

    private _transformedPt(x:number, y:number):{x:number, y:number} {
        return {x:this.relativeMode ? (this.bounds.x + this.bounds.width * x): x, y:this.relativeMode ? (this.bounds.y + this.bounds.height * y): y};
    }

    closePath():EzElement {
        this.attr({d:this.pathDefs.join(' ')+'Z'});
        this.bounds = null;
        this.relativeMode = false;
        this.pathDefs = [];
        return this;
    }



    prependChild(child:EzElement):EzElement{
        this.el.prepend(child.el);
        return this;
    }

    appendChild(child:EzElement):EzElement {
        this.el.appendChild(child.el);
        return this;
    }

    appendChildren(children:EzElement[]):EzElement {
        children.map(c=>c.el).forEach(el=>this.el.appendChild(el));
        return this;
    }

    /**
     *  return current element's child elements 
     */
    childElements():EzElement[] {
        const childEls = [].slice.call(this.el.children);
        return childEls.map(el=>EzElement.el(el));
    }

    attr(attr:{[key:string]:string|number}, toHyphenCase=true):EzElement {
        Object.keys(attr).forEach(key=>{
            if(toHyphenCase){
                const attrName = camelCaseToHyphenCase(key);
                this.el.setAttribute(attrName, ''+attr[key]);
            }else {
                this.el.setAttribute(key, ''+attr[key]);
            }
        });
        return this;
    }

    getAttr(key:string):string {
        return this.el.getAttribute(key);
    }

    hasAttr(key:string):boolean {
        return this.el.hasAttribute(key);
    }

    removeAttr(attr:string):EzElement {
        const attrName = camelCaseToHyphenCase(attr);
        this.el.removeAttribute(attrName);
        return this;
    }

    style(attr:{[key:string]:string|number}):EzElement {
        const el = this.el as HTMLElement;
        Object.keys(attr).forEach(key=>{
            el.style[key] = attr[key];
        });
        return this;
    }

    line(points:EzPoint[]){
        let d = '';
        points.forEach((point, index)=>{
            if(index === 0){
                d+=`M ${point.x} ${point.y}`;
            } else {
                d+=` L ${point.x} ${point.y}`;
            }
        });
        this.attr({d});
        return this;
    }

    /**
     * add a "handler" attribute to element.
     * every handler element (such as vertex handler or edge handlder) should have this attribute
     * @returns 
     */
    asHandler():EzElement {
        return this.attr({handler:1});
    }

    /**
     * clear innerHTML of current element
     * @returns 
     */
    empty():EzElement {
        this.el.innerHTML = '';
        return this;
    }

    clone():EzElement {
        return EzElement.el(this.el.cloneNode(true) as Element);
    }


    /**
     * find the nearest ancestor with the given selector 
     * @param el 
     * @param selector 
     * @returns 
     */
    nearestAncestor(selector:string):EzElement {
        const el = this.el;
        let parent = el.parentElement;
        while(parent){
            if(parent.matches(selector)){
                return EzElement.el(parent);
            }
            parent = parent.parentElement;
        }

    }


    /**
     * find the farest ancestor  with the given selector 
     * @param el 
     * @param selector 
     * @returns 
     */
    farestAncestor(selector:string):EzElement {
        const el = this.el;
        let parent = el.parentElement;
        let result:Element;
        while(parent){
            if(parent.matches(selector)){
                result = parent;
            }
            parent = parent.parentElement;
        }
        if(result){
            return EzElement.el(result);
        }
    }

    /**
     * return if the current element matches the given selector
     * @param selector 
     */
    is(selector:string):boolean {
        return this.el.matches(selector);
    }

    /**
     * remove element from document
     */
    remove():void {
        this.el.remove();
    }

    /**
     * set el innerHTML
     * @param html
     * @returns 
     */
    html(html:string):EzElement {
        this.el.innerHTML = html;
        return this;
    }

    /**
     * return the first element child of current elment 
     */
    firstElementChild():EzElement {
        const c = this.el.firstElementChild;
        if(c){
            return EzElement.el(c);
        }
    }

    /**
     * retrieve data from element's dataSet with the given key
     * @param key 
     * @returns 
     */
    data(key:string):string {
        const el = this.el as HTMLElement;
        return el.dataset[key];
    }

    /**
     * insert current element before the given element 
     * @param el 
     */
    insertBefore(el:EzElement):EzElement {
        this.el.parentNode.insertBefore(this.el, el.el);
        return this;
    }

    static el(tag:string | Element, xmlns = SVG_NAME_SPACE):EzElement {
        return new EzElement(tag, xmlns);
    }

    static line(points:EzPoint[]):EzElement {
        return new EzElement('path').line(points);
    }
}