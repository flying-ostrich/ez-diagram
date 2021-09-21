import { BaseLayout } from './base-layout';

export class EzLayoutManager {
    layouts:Map<string, BaseLayout> = new Map();

    /**
     * register layout with layout name
     * @param layoutName 
     * @param layout 
     * @returns 
     */
    use(layoutName:string, layout:BaseLayout):void {
        if(this.layouts.has(layoutName)){
            if(__DEV__){
                console.error(`layout ${layoutName} is already exist`);
            }
            return;
        }
        this.layouts.set(layoutName, layout);
    }

    /**
     * get layout instance 
     * @param layoutName 
     */
    get(layoutName:string):BaseLayout {
        return this.layouts.get(layoutName);
    }
}