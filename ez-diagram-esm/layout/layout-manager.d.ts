import { BaseLayout } from './base-layout';
export declare class EzLayoutManager {
    layouts: Map<string, BaseLayout>;
    /**
     * register layout with layout name
     * @param layoutName
     * @param layout
     * @returns
     */
    use(layoutName: string, layout: BaseLayout): void;
    /**
     * get layout instance
     * @param layoutName
     */
    get(layoutName: string): BaseLayout;
}
