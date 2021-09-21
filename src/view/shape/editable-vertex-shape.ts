import { EzElement, HTML_NAME_SPACE } from '../canvas/ez-element';
import { getFontStyles } from '../style/style';
import { EzVertexShape } from './vertex-shape';

export class EditableVertexShape extends EzVertexShape {
    text:EzElement;

    foreignObject:EzElement;

    draw():void {
        super.draw();

        const bounds = this.state.getBounds().plain();
        this.text = EzElement.el('div', HTML_NAME_SPACE).html(this.state.node.text).style({
            width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', userSelect:'none'
        });
        this.foreignObject = EzElement.el('foreignObject').attr({...bounds}).appendChild(
            this.text
        );
        this.root.prependChild(this.foreignObject);
        this._udpateStyle();
    }

    redraw():void {
        super.redraw();

        const state = this.state.alternate || this.state;
        const bounds = state.getBounds().plain();
        this.foreignObject.attr(bounds);
        this.text.html(state.node.text);
        this._udpateStyle();
     
    }

    onStartEditing():void {
        this.foreignObject.style({display:'none'});
    }

    onStopEditing():void {
        this.foreignObject.style({display:'block'});
    }

    private _udpateStyle():void {
        const textStyle = getFontStyles(this.state.style);
        this.text.style(textStyle);
    }
}