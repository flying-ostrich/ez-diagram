import { AlternateProcessShape } from './built-in/flowchart/alternate-process';
import { DataShape } from './built-in/flowchart/data';
import { DecisionShape } from './built-in/flowchart/decision';
import { DelayShape } from './built-in/flowchart/delay';
import { DisplayShape } from './built-in/flowchart/display';
import { DocumentShape } from './built-in/flowchart/document';
import { InputOutputShape } from './built-in/flowchart/input-output';
import { ManualInputShape } from './built-in/flowchart/manual-input';
import { ManualOperationShape } from './built-in/flowchart/manual-operation';
import { MultiDocumentShape } from './built-in/flowchart/multi-document';
import { OffPageConnectorShape } from './built-in/flowchart/off-page-connector';
import { OnPageConnectorShape } from './built-in/flowchart/on-page-connector';
import { PredefinedProcessShape } from './built-in/flowchart/predefined-process';
import { PreparationShape } from './built-in/flowchart/preparation';
import { ProcessShape } from './built-in/flowchart/process';
import { TerminalShape } from './built-in/flowchart/terminal';
import { GridBackgroundShape } from './built-in/grid-background-shape';
import { EzLineShape } from './built-in/line/line-shape';
import { EzTreeLineShape } from './built-in/line/tree-line-shape';
import { EzRectangleShape } from './built-in/rectangle-shape';
import { RoundStickerShape } from './built-in/sticker/round-sticker-shape';
import { StickerShape } from './built-in/sticker/stiker-shape';
import { EzShapeConstructor } from './shape';

export const BUILTIN_SHAPE = {
    GRID_BACKGROUND:'grid-background',
    RECTANGLE:'rectangle',
    LINE:'line',
    STICKER:'sticker',
    ROUND_STICKER:'round-sticker',
    FLOW_CHART:{
        TERMINAL:'terminal', 
        PROCESS:'process',
        DECISION:'decision', 
        INPUT_OUTPUT:'input-output', 
        PREDEFINED_PROCESS:'predefined-process',
        ON_PAGE_CONNECTOR:'on-page-connector',
        OFF_PAGE_CONNECTOR:'off-page-connector',
        DELAY:'delay',
        ALTERNATE_PROCESS:'alternate-process',
        DATA:'data',
        DOCUMENT:'document',
        MULTI_DOCUMENT:'multi-document',
        PREPARATION:'preparation',
        DISPLAY:'display',
        MANUAL_INPUT:'manual-input',
        MANUAL_OPERATION:'manual-operation'
    },
    EDGE:{TREE_LINE:'tree-line'}
};

export class EzShapeManager {
    shapes = new Map<string, EzShapeConstructor>();
    
    constructor(){
        this.registerBuiltInShapes();
    }
    
    private registerBuiltInShapes():void {
        this.shapes.set(BUILTIN_SHAPE.LINE, EzLineShape);
        this.shapes.set(BUILTIN_SHAPE.EDGE.TREE_LINE, EzTreeLineShape);
        this.shapes.set(BUILTIN_SHAPE.RECTANGLE, EzRectangleShape);
        this.shapes.set(BUILTIN_SHAPE.GRID_BACKGROUND, GridBackgroundShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.TERMINAL, TerminalShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.PROCESS, ProcessShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DECISION, DecisionShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.INPUT_OUTPUT, InputOutputShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.PREDEFINED_PROCESS, PredefinedProcessShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.ON_PAGE_CONNECTOR, OnPageConnectorShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.OFF_PAGE_CONNECTOR, OffPageConnectorShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DELAY, DelayShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.ALTERNATE_PROCESS, AlternateProcessShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DATA, DataShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DOCUMENT, DocumentShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.MULTI_DOCUMENT, MultiDocumentShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.PREPARATION, PreparationShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.DISPLAY, DisplayShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.MANUAL_INPUT, ManualInputShape);
        this.shapes.set(BUILTIN_SHAPE.FLOW_CHART.MANUAL_OPERATION, ManualOperationShape);
        this.shapes.set(BUILTIN_SHAPE.STICKER, StickerShape);
        this.shapes.set(BUILTIN_SHAPE.ROUND_STICKER, RoundStickerShape);
    }

    public registerShape(shapeName:string, shape:EzShapeConstructor):void {
        if(__DEV__){
            if(this.shapes.get(shapeName)){
                console.error(`shapeName ${shapeName} already exists , please use another shapeName`);
            }
        }
        this.shapes.set(shapeName, shape);
    }

    public getShape(shapeName:string):EzShapeConstructor {
        return this.shapes.get(shapeName);
    }
}