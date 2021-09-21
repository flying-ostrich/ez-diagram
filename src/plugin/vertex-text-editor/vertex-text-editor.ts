import { EzMouseEvent } from '../../event/event';
import { EzElement, HTML_NAME_SPACE } from '../../view';
import { getFontStyles } from '../../view/style/style';
import { EzVertexViewState, EzViewState } from '../../view/view/view-state';
import { EzDiagramPlugin } from '../diagram-plugin';
import { getHandlerContainer } from '../handler-dom';

export class VertexTextEditor extends EzDiagramPlugin {
    private _editorElm:EzElement;

    private _editorContentWrapper:EzElement;

    private _isMouseDown = false;

    private _editingState:EzViewState;

    get selected():EzVertexViewState {
        const selected = this.context.selectedViewStates;
        if(selected && selected.length ===1 && selected[0] instanceof EzVertexViewState){
            return selected[0];
        }
    }

    canActivate():boolean{
        return !!this.selected;
    }

    onDeActivate():void {
        this._clear();
    }

    onChangeSelection(){
        this._clear();
    }

    onDblClick(evt:EzMouseEvent):void{
        if(this._canStartEditing(evt) && evt.state.style.editable !==false){
            this._startEditing();
        }
    }

    onMouseDown():void {
        this._isMouseDown = true;
    }

    onMouseMove({evt}:EzMouseEvent):void {
        const target = evt.target as Element;
        if(!target) return;
        if(!this._isMouseDown) return;
        if(this._isEditorFocused(evt)) return;

        if(this._editorElm){
            this._updateEditorElm();
        }
    }

    onMouseUp():void {
        this._isMouseDown = false;
    }

    private _clear():void {
        const view = this.diagram.view;
        if(this._editingState){
            const val = this._editorContentWrapper.el.innerHTML;
            view.updateText(this._editingState, val);
            this.diagram.pluginManager.callHook('onStopEditing', this._editingState);
            view.callShapeEventHook(this._editingState, 'onStopEditing');
            this._editingState = null;
        }
        this._editorElm?.remove();
        this._editorElm = null;
        this._editorContentWrapper = null;
    }

    private _canStartEditing(evt:EzMouseEvent):boolean {
        const target = evt.evt.target as Element;
        if(!target) return false;
        return !this._isEditorFocused(evt.evt);
    }

    private _startEditing():void {
        if(!this._editorElm){
            this._createEditorElm();
        }
        this._updateEditorElm();
        this._focusEditor();
        this._editingState = this.selected;
        this.diagram.pluginManager.callHook('onStartEditing', this.selected);
        this.diagram.view.callShapeEventHook(this.selected, 'onStartEditing');
    }

    private _createEditorElm():void{
        this._editorContentWrapper = EzElement.el('div', HTML_NAME_SPACE).attr({contenteditable:'true', id:'editor'}).style({
            outline:'none',
            maxWidth:'98%',
            minWidth:'10px',
            textAlign:'center'
        });
        this._editorContentWrapper.el.appendChild(document.createTextNode(''));

        const fontStyles = getFontStyles(this.selected.style);
        this._editorElm = getHandlerContainer(this.selected).appendChild(
            EzElement.el('foreignObject').attr({...this.selected.getBounds().plain()}).appendChild(
                EzElement.el('div', HTML_NAME_SPACE).style({
                    width:'100%', height:'100%', display:'flex', 
                    alignItems:'center', justifyContent:'center', 
                    flexDirection:'column', textAlign:'center'
                }).style(fontStyles).appendChild(this._editorContentWrapper)
            )
        );
        this.diagram.view.overlayGroup.appendChild(this._editorElm);
    }

    private _focusEditor():void {
        const range = document.createRange();
        const sel = window.getSelection();
        const last =(()=>{
            let last = this._editorContentWrapper.el?.lastChild;
            while(last.nodeType !==3){
                last = last.lastChild;
            }
            return last;
        })(); 
        const len = last.textContent.length;
        range.setStart(last, len);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    private _updateEditorElm():void {
        const state = this.selected.alternate || this.selected;
        const bounds = state.getBounds().plain();
        this._editorElm.attr(bounds).firstElementChild()?.attr(bounds);

        const text = state.node.text;
        if(!text){
            this._editorContentWrapper.el.appendChild(document.createTextNode(''));
        }else {
            this._editorContentWrapper.html(text);
        }
    }

    private _isEditorFocused(evt:MouseEvent):boolean {
        const target = evt.target as Element;
        return !!(EzElement.el(target).farestAncestor('#editor') || EzElement.el(target).is('#editor'));
    }
}