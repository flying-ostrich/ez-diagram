import { EzElement } from '../../view';
import { EzDiagramPlugin } from '../diagram-plugin';
import { Subscription } from 'rxjs';
/**
 *  bind hot key action for diagram
 */
export declare class EzHotKey extends EzDiagramPlugin {
    root: EzElement;
    zoomSubscription: Subscription;
    translateSubscription: Subscription;
    private _isEditing;
    onCreate(): void;
    onStartEditing(): void;
    onStopEditing(): void;
    isValidKeyEvent(event: KeyboardEvent): boolean;
    /**
     *  press Backspace to delete element
     */
    private _bindShortcut;
    /**
     *  bind key handlers
     */
    private _bindKeyhandlers;
    /**
     *  zoom and scale graph using mouse wheel or touch pad
     */
    private _bindScaleAndTranslate;
    onDestroy(): void;
}
