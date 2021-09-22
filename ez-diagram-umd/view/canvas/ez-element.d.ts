import { EzPoint, EzRectangle } from '../../model';
export declare const SVG_NAME_SPACE = "http://www.w3.org/2000/svg";
export declare const HTML_NAME_SPACE = "http://www.w3.org/1999/xhtml";
export declare class EzElement {
    el: Element;
    bounds: EzRectangle;
    relativeMode: boolean;
    pathDefs: string[];
    constructor(el: string | Element, xmlns?: string);
    beginPath(relativeMode: boolean, bounds?: EzRectangle): EzElement;
    moveTo(x: number, y: number): EzElement;
    lineTo(x: number, y: number): EzElement;
    curveTo(cx1: number, cy1: number, cx2: number, cy2: number, x: number, y: number): EzElement;
    arcTo(rx: number, ry: number, rotation: number, largeArcFlag: 0 | 1, sweepFlag: 0 | 1, x: number, y: number): EzElement;
    private _transformedPt;
    closePath(): EzElement;
    prependChild(child: EzElement): EzElement;
    appendChild(child: EzElement): EzElement;
    appendChildren(children: EzElement[]): EzElement;
    /**
     *  return current element's child elements
     */
    childElements(): EzElement[];
    attr(attr: {
        [key: string]: string | number;
    }, toHyphenCase?: boolean): EzElement;
    getAttr(key: string): string;
    hasAttr(key: string): boolean;
    removeAttr(attr: string): EzElement;
    style(attr: {
        [key: string]: string | number;
    }): EzElement;
    line(points: EzPoint[]): this;
    /**
     * add a "handler" attribute to element.
     * every handler element (such as vertex handler or edge handlder) should have this attribute
     * @returns
     */
    asHandler(): EzElement;
    /**
     * clear innerHTML of current element
     * @returns
     */
    empty(): EzElement;
    clone(): EzElement;
    /**
     * find the nearest ancestor with the given selector
     * @param el
     * @param selector
     * @returns
     */
    nearestAncestor(selector: string): EzElement;
    /**
     * find the farest ancestor  with the given selector
     * @param el
     * @param selector
     * @returns
     */
    farestAncestor(selector: string): EzElement;
    /**
     * return if the current element matches the given selector
     * @param selector
     */
    is(selector: string): boolean;
    /**
     * remove element from document
     */
    remove(): void;
    /**
     * set el innerHTML
     * @param html
     * @returns
     */
    html(html: string): EzElement;
    /**
     * return the first element child of current elment
     */
    firstElementChild(): EzElement;
    /**
     * retrieve data from element's dataSet with the given key
     * @param key
     * @returns
     */
    data(key: string): string;
    /**
     * insert current element before the given element
     * @param el
     */
    insertBefore(el: EzElement): EzElement;
    static el(tag: string | Element, xmlns?: string): EzElement;
    static line(points: EzPoint[]): EzElement;
}
