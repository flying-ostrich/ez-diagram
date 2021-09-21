export type KeyCodeHandler = (evt:KeyboardEvent)=> void;



export enum ModifierKey {
    none=0x0000,
    alt=0x0001,
    meta=0x0010,
    shift=0x0100,
    control=0x1000,
    altMeta=0x0011,
    altShift=0x0101,
    altControl=0x1001,
    metaShift=0x0110,
    metaControl=0x1010,
    shiftControl=0x1100,
}

export enum Key {
    X = 'x',
    BACKSPACE = 'Backspace',
    ARROW_DOWN = 'ArrowDown',
    ARROW_UP = 'ArrowUp',
    ARROW_LEFT = 'ArrowLeft',
    ARROW_RIGHT = 'ArrowRight'
}

interface KeycodeHandlerMapping {
    [key:string]:KeyCodeHandler;
}

export interface KeyCodeHandlers {
    [ModifierKey.none]?:KeycodeHandlerMapping;
    [ModifierKey.alt]?:KeycodeHandlerMapping;
    [ModifierKey.meta]?:KeycodeHandlerMapping;
    [ModifierKey.shift]?:KeycodeHandlerMapping;
    [ModifierKey.control]?:KeycodeHandlerMapping;
    [ModifierKey.altMeta]?:KeycodeHandlerMapping;
    [ModifierKey.altShift]?:KeycodeHandlerMapping;
    [ModifierKey.altControl]?:KeycodeHandlerMapping;
    [ModifierKey.metaShift]?:KeycodeHandlerMapping;
    [ModifierKey.metaControl]?:KeycodeHandlerMapping;
    [ModifierKey.shiftControl]?:KeycodeHandlerMapping;
}

/**
 * The HotkeyHandler Provides the function of binding and unbinding shortcut key event handlers
 */
export class HotkeyHandler {
    handlers:KeyCodeHandlers = {};

    /**
     * bind key handler
     * @param modifierKey 
     * @param code 
     * @param handler 
     */
    bindKeyHandler(modifierKey:ModifierKey, key:Key, handler:KeyCodeHandler):void {
        if(modifierKey in ModifierKey){
            if(!this.handlers[modifierKey]) this.handlers[modifierKey] = {};
            this.handlers[modifierKey][key] =handler;
        }else {
            if(__DEV__){
                console.error(`HotkeyHandler:bindKeyHandler the mofidfierKey ${modifierKey} is not found`);
            }
        }
    }

    /**
     * unbind key handler
     * @param modifierKey 
     * @param code 
     */
    unbindKeyHandler(modifierKey:ModifierKey, code:number):void {
        if(modifierKey in ModifierKey){
            if(this.handlers?.[modifierKey]?.[code]){
                this.handlers[modifierKey][code] = null;
            }
        }else {
            if(__DEV__){
                console.error(`HotkeyHandler:bindKeyHandler the mofidfierKey ${modifierKey} is not found`);
            }
        }
    }

    handleKeyPress(event:KeyboardEvent):void {
        const alt= event.altKey ? ModifierKey.alt:ModifierKey.none;
        const meta=event.metaKey ? ModifierKey.meta:ModifierKey.none;
        const shift=event.shiftKey ? ModifierKey.shift:ModifierKey.none;
        const ctrl= event.ctrlKey ? ModifierKey.control:ModifierKey.none;
        const modifierKey = alt | meta | shift | ctrl;
        const keyCode = event.key;
        const handler = this.handlers?.[modifierKey]?.[keyCode];
        if(handler){
            handler();
        }
    }
}