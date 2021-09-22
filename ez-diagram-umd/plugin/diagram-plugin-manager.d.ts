import { EzDiagramPlugin, EzPluginContext } from './diagram-plugin';
import { EzDiagram } from '../diagram';
export declare class EzDiagramPluginManager {
    private diagram;
    private plugins;
    private pluginContext;
    constructor(diagram: EzDiagram);
    /**
     * register a new diagram plugin
     * @param pluginName
     * @param plugin
     * @param rerender - specify if the view should rerender
     */
    use(pluginName: string, plugin: EzDiagramPlugin, rerender?: boolean): void;
    /**
     * remove plugin by the given plugin name
     * @param pluginName
     * @param rerender
     */
    remove(pluginName: string, rerender?: boolean): void;
    /**
     * get plugin instance
     * @param pluginName
     * @returns
     */
    get(pluginName: string): EzDiagramPlugin;
    /**
     * call a hook by the given hook name
     * @param hookName
     * @param restArgs
     */
    callHook(hookName: string, ...restArgs: any[]): void;
    getPlugins(): Map<string, EzDiagramPlugin>;
    getContext(): EzPluginContext;
}
