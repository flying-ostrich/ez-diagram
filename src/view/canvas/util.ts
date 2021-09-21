export function setAttribute(el:Element, attrs: {[key:string]: string|number}):void{
    const keys = Object.keys(attrs);
    keys.forEach(key=>{
        el.setAttribute(key, ''+attrs[key]);
    });
}