import { EzElement } from '../../view';
import { EzDiagramPlugin } from '../diagram-plugin';

const BG_ID = 'ez-bg';
const BG_GRID_SIZE = 30;
export class EzBackGround extends EzDiagramPlugin {
    bgContaner:EzElement;

    bgDef:EzElement;

    onRendered():void{   
        this.createBgDef();
        this.createBgContainer();
    }

    afterViewUpdate(){
        this.update();
    }

    private update():void {
        const view = this.diagram.view;
        if(!view.size) return;
        if(view?.size?.width===0) return;

        const scale = view.getScale();
        const translate = view.getTranslate();
        const translateX = translate.x % view.size.width - view.size.width*3;
        const translateY = translate.y % view.size.height- view.size.height*3;
        this.bgContaner.style({transform:`scale(${scale}) translate(${translateX}px,${translateY}px)`});
    }

    private createBgDef():void {
        const view = this.diagram.view;
        let pattern:EzElement;
        if(this.context.background){
            pattern = this.context.background(this.diagram);
        }else {
            pattern = this.getDefaultGrid();
        }
        view.defs.appendChild(pattern);
    }

    private createBgContainer():void {
        const view = this.diagram.view;
        this.bgContaner = EzElement.el('g').attr({
            class:'ez-bg-container', width:'600%', height:'600%'
        }).appendChild(
            EzElement.el('rect').attr({
                fill:`url(#${BG_ID})`, width:'600%', height:'600%'
            })
        );
        view.svg.prependChild(this.bgContaner);
    }

    private getDefaultGrid():EzElement {
        return EzElement.el('pattern').attr({
            width:BG_GRID_SIZE*this.diagram.view.getScale(), height:BG_GRID_SIZE*this.diagram.view.getScale(), id:BG_ID, patternUnits:'userSpaceOnUse'
        }, false).appendChild(
            EzElement.el('rect').attr({
                x:0, y:0, width:BG_GRID_SIZE*this.diagram.view.getScale(), height:BG_GRID_SIZE*this.diagram.view.getScale(), fill:'none', stroke:'#e0e0e0', strokeWidth:1
            })
        );
    }
}