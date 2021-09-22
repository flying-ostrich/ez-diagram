import { EzElement } from '../../view';
import { EzDiagramPlugin } from '../diagram-plugin';
export declare class EzBackGround extends EzDiagramPlugin {
    bgContaner: EzElement;
    bgDef: EzElement;
    onRendered(): void;
    afterViewUpdate(): void;
    private update;
    private createBgDef;
    private createBgContainer;
    private getDefaultGrid;
}
