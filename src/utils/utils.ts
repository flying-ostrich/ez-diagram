export function camelCaseToHyphenCase(camelCaseStr:string):string {
    return camelCaseStr.split(/(?=[A-Z])/).map(i=>i.toLowerCase()).join('-');
}

export function cloneDeep(obj:Object, ignore:string[]=[]) {
    if(typeof(obj) !=='object'){
        return obj;
    }

    if(obj instanceof Date) {
        return new Date(obj);
    }
    
    if(Array.isArray(obj)){
        return obj.map(item=>typeof(item)==='object'? cloneDeep(obj, ignore):item);
    }

    const result = Object.assign({}, obj);
    Object.entries(result).forEach(([key, value])=>{
        result[key] =ignore.indexOf(key)===-1?cloneDeep(value, ignore):value;
    });

    return result;
}

export function isMac():boolean {
    const v = navigator.appVersion;
    if(!v) return false;
    return v.indexOf('Mac') !== -1;
}