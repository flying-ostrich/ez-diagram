export declare type KeyCodeHandler = (evt: KeyboardEvent) => void;
export declare enum ModifierKey {
    none = 0,
    alt = 1,
    meta = 16,
    shift = 256,
    control = 4096,
    altMeta = 17,
    altShift = 257,
    altControl = 4097,
    metaShift = 272,
    metaControl = 4112,
    shiftControl = 4352
}
export declare enum Key {
    X = "x",
    BACKSPACE = "Backspace",
    ARROW_DOWN = "ArrowDown",
    ARROW_UP = "ArrowUp",
    ARROW_LEFT = "ArrowLeft",
    ARROW_RIGHT = "ArrowRight"
}
interface KeycodeHandlerMapping {
    [key: string]: KeyCodeHandler;
}
export interface KeyCodeHandlers {
    [ModifierKey.none]?: KeycodeHandlerMapping;
    [ModifierKey.alt]?: KeycodeHandlerMapping;
    [ModifierKey.meta]?: KeycodeHandlerMapping;
    [ModifierKey.shift]?: KeycodeHandlerMapping;
    [ModifierKey.control]?: KeycodeHandlerMapping;
    [ModifierKey.altMeta]?: KeycodeHandlerMapping;
    [ModifierKey.altShift]?: KeycodeHandlerMapping;
    [ModifierKey.altControl]?: KeycodeHandlerMapping;
    [ModifierKey.metaShift]?: KeycodeHandlerMapping;
    [ModifierKey.metaControl]?: KeycodeHandlerMapping;
    [ModifierKey.shiftControl]?: KeycodeHandlerMapping;
}
/**
 * The HotkeyHandler Provides the function of binding and unbinding shortcut key event handlers
 */
export declare class HotkeyHandler {
    handlers: KeyCodeHandlers;
    /**
     * bind key handler
     * @param modifierKey
     * @param code
     * @param handler
     */
    bindKeyHandler(modifierKey: ModifierKey, key: Key, handler: KeyCodeHandler): void;
    /**
     * unbind key handler
     * @param modifierKey
     * @param code
     */
    unbindKeyHandler(modifierKey: ModifierKey, code: number): void;
    handleKeyPress(event: KeyboardEvent): void;
}
export {};
