import { EzPoint, EzRectangle } from '../../model';
import { EzConstraint } from '../../model/constraint/constraint';
import { getRotatedPoint } from '../../public-api';
import { EzElement, EzDiagramView } from '../../view';
import { EzVertexViewState } from '../../view/view/view-state';
import { getHandlerContainer } from '../handler-dom';

export function generateElements(view:EzDiagramView, state:EzVertexViewState, grow = 0): [EzConstraint[], EzPoint[], EzElement, ()=>void] {
  
    const getData = ():[EzRectangle, EzConstraint[], EzPoint[]]=>{
        const s = state.alternate || state;
        const bounds = s.getBounds().clone().grow(grow);
        const targetConstraints = state.node.constraints;
        const constraintPoints = targetConstraints.map(constraint=>{
            return new EzPoint(bounds.x+constraint.percentX*bounds.width+constraint.offsetX, bounds.y+constraint.percentY*bounds.height+constraint.offsetY);
        }).map(point=>getRotatedPoint(point, state.style.rotation || 0, bounds.center())).map(pt=>view.ensurePointMeetsGrid(pt));
        return [bounds, targetConstraints, constraintPoints];
    };

    const [bounds, targetConstraints, constraintPoints] = getData();
    
    const rectEl = EzElement.el('rect').attr({
        x:bounds.x,
        y:bounds.y,
        width:bounds.width,
        height:bounds.height,
        fill:'rgba(255,255,255,0.01)',
        transform:`rotate(${state.style.rotation||0} ${bounds.center().x} ${bounds.center().y})`
    }).style({pointerEvents:'stroke'});

    const constraintEls = constraintPoints.map((point, index)=>EzElement.el('ellipse').attr({
        cx:point.x, cy:point.y, rx:5, ry:5, fill:'rgba(132, 168, 235,0.5)', class:'edge-generate-bend', dataIndex:index
    }));

    const children = [rectEl, ...constraintEls];

    const handlerElement = getHandlerContainer(state).appendChildren(children);
    const update = () =>{
        const [bounds, _, constraintPoints] = getData();
        rectEl.attr(bounds.plain());
        constraintEls.forEach((el, idx)=>{
            const point = constraintPoints[idx];
            el.attr({
                cx:point.x, cy:point.y, rx:5, ry:5
            });
        });

    };

    return [targetConstraints, constraintPoints, handlerElement, update];
}