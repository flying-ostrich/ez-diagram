import { isMac } from '../../utils/utils';
import { EzElement } from '../../view';
import { EzDiagramPlugin } from '../diagram-plugin';
import { fromEvent, Subscription} from 'rxjs';
import {
 filter, tap, throttleTime, map
} from 'rxjs/operators';
import { EzPoint } from '../../model';
import { Key, ModifierKey } from './hot-key-handler';
import { BUILTIN_ACTIONS } from '../../diagram/actions';

/**
 *  bind hot key action for diagram
 */
export class EzHotKey extends EzDiagramPlugin {

    root:EzElement;

    zoomSubscription:Subscription;

    translateSubscription:Subscription;

    private _isEditing = false;

    onCreate(){
        this._bindScaleAndTranslate();
        this._bindKeyhandlers();
        this._bindShortcut();
    }

    onStartEditing(){
        this._isEditing = true;
    }

    onStopEditing(){
        this._isEditing = false;
    }

    isValidKeyEvent(event:KeyboardEvent):boolean {
        return !!this.context.selectedViewStates?.length;
    }

    /**
     *  press Backspace to delete element
     */
    private _bindShortcut():void {
        const keyHandler = this.diagram.keyHandler;
        keyHandler.bindKeyHandler(ModifierKey.none, Key.BACKSPACE, ()=>!this._isEditing && this.diagram.actions.execute(BUILTIN_ACTIONS.DELETE_SELECTED));
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_UP, ()=>this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_UP));
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_DOWN, ()=>this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_DOWN));
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_LEFT, ()=>this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_LEFT));
        keyHandler.bindKeyHandler(ModifierKey.none, Key.ARROW_RIGHT, ()=>this.diagram.actions.execute(BUILTIN_ACTIONS.MOVE_RIGHT));
    }

    /**
     *  bind key handlers
     */
    private _bindKeyhandlers():void {
        fromEvent(document.documentElement, 'keydown').pipe(
            map((event:KeyboardEvent)=>{
                if(this.isValidKeyEvent(event)){
                    this.diagram.keyHandler.handleKeyPress(event);
                }
            })
        ).subscribe();
    }

    /**
     *  zoom and scale graph using mouse wheel or touch pad
     */
    private _bindScaleAndTranslate():void {
        const view = this.diagram.view;
        this.root = view.svg;
        let wheelDeltaX = 0;
        let wheelDeltaY = 0;

        const wheel = fromEvent(this.root.el, 'wheel').pipe(
            filter(()=>this.diagram.configManager.shouldScaleAndTranslate),
            tap((evt:WheelEvent)=>{
                evt.stopPropagation();
                evt.preventDefault();
            }), 

            throttleTime(16),
            tap((evt:WheelEvent)=>{
                wheelDeltaX+=evt['wheelDeltaX'];
                wheelDeltaY+=evt['wheelDeltaY'];
            }),
        );
        
        this.zoomSubscription = wheel.pipe(filter((evt:WheelEvent)=>{
            return evt.ctrlKey || (evt.metaKey && isMac());
        })).subscribe((evt)=>{
            const scaleCenter = new EzPoint(evt.clientX-view.size.left, evt.clientY-view.size.top);
            if(evt.deltaY>0){
                if(view.getScale()<0.5)return;
                this.diagram.zoomOut(0.15, scaleCenter);
            }else {
                if(view.getScale()>4)return;
                this.diagram.zoomIn(0.15, scaleCenter);
            }
            wheelDeltaX = 0;
            wheelDeltaY = 0;
        });

        this.translateSubscription = wheel.pipe(filter((evt:WheelEvent)=>{
            return !evt.ctrlKey && !(evt.metaKey && isMac());
        })).subscribe(()=>{
            const offset = new EzPoint(Math.round(wheelDeltaX), Math.round(wheelDeltaY));
            this.diagram.translate(offset);
            wheelDeltaX = 0;
            wheelDeltaY = 0;
        });
    }

    onDestroy():void {
        this.zoomSubscription.unsubscribe();
        this.translateSubscription.unsubscribe();
    }
}