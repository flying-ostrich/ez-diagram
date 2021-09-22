import { BaseLayout } from '../base-layout';
export interface TreeLayoutConfig {
    nodeSpacing?: number;
    layerSpacing?: number;
}
export declare class TreeLayout extends BaseLayout {
    private _direction;
    private _config;
    private get _isVertical();
    updateLayoutNodes(): void;
    executeLayout(): void;
    updateViewStates(): void;
}
