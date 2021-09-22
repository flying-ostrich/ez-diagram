import { EzMouseEvent } from '../../event/event';
import { EzVertexViewState } from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
export declare class VertexTextEditor extends EzDiagramPlugin {
    private _editorElm;
    private _editorContentWrapper;
    private _isMouseDown;
    private _editingState;
    get selected(): EzVertexViewState;
    canActivate(): boolean;
    onDeActivate(): void;
    onChangeSelection(): void;
    onDblClick(evt: EzMouseEvent): void;
    onMouseDown(): void;
    onMouseMove({ evt }: EzMouseEvent): void;
    onMouseUp(): void;
    private _clear;
    private _canStartEditing;
    private _startEditing;
    private _createEditorElm;
    private _focusEditor;
    private _updateEditorElm;
    private _isEditorFocused;
}
