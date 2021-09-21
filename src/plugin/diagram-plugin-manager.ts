import { EzDiagramPlugin, EzPluginContext } from './diagram-plugin';
import { EzDiagram } from '../diagram';

export class EzDiagramPluginManager {
    private diagram:EzDiagram;

    private plugins = new Map<string, EzDiagramPlugin>();

    private pluginContext:EzPluginContext = {};

    constructor(diagram:EzDiagram){
        this.diagram = diagram;
    }

    /**
     * register a new diagram plugin
     * @param pluginName 
     * @param plugin 
     * @param rerender - specify if the view should rerender
     */
    use(pluginName:string, plugin:EzDiagramPlugin, rerender = false):void{
        if(!this.plugins.has(pluginName)){
            this.plugins.set(pluginName, plugin);
            if(rerender){
                this.diagram.render();
            }
        }else {
            if(__DEV__){
                console.error(`EzDiagramPluginManager:use plugin ${pluginName} is already existed`);
            }
        }
    }

    /**
     * remove plugin by the given plugin name
     * @param pluginName 
     * @param rerender 
     */
    remove(pluginName:string, rerender = true):void {
        if(this.plugins.has(pluginName)){
            this.plugins.delete(pluginName);
            if(rerender){
                this.diagram.render();
            }
        }else {
            if(__DEV__){
                console.error(`EzDiagramPluginManager:remove plugin ${pluginName} is not found`);
            }
        }
    }

    /**
     * get plugin instance 
     * @param pluginName 
     * @returns 
     */
    get(pluginName:string):EzDiagramPlugin {
        if(this.plugins.has(pluginName)){
            return this.plugins.get(pluginName);
        }
    }

    /**
     * call a hook by the given hook name
     * @param hookName 
     * @param restArgs 
     */
    callHook(hookName:string, ...restArgs):void {
        const plugins = this.diagram.pluginManager.getPlugins();
        plugins.forEach(plugin=>{
            if(plugin.canActivate() && !plugin.disabled){
                plugin.active = true;
                const eventHook = plugin?.[hookName];
                if(!eventHook) return;
                eventHook.apply(plugin, restArgs);
            }else if(plugin.active) {
                plugin.active = false;
                plugin?.onDeActivate();
            }
        });

    }
    
    getPlugins():Map<string, EzDiagramPlugin> {
        return this.plugins;
    }

    getContext():EzPluginContext {
        return this.pluginContext;
    }
}

