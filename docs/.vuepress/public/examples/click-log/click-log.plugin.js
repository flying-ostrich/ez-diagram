import { Plugin } from "../../ez-diagram-esm/ez-diagram-esm.js";

export class ClickLogPlugin extends Plugin.EzDiagramPlugin {
    static NAME = 'CLICK_LOG';

    /**
     *  while diagram node is clicked , the onClick hook will be invoked
     */
    onClick({state}){
        if(!state) return;
        console.log('your clicked diagram node->',state.node.id);
    }
}