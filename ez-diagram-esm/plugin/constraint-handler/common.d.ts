import { EzPoint } from '../../model';
import { EzConstraint } from '../../model/constraint/constraint';
import { EzElement, EzDiagramView } from '../../view';
import { EzVertexViewState } from '../../view/view/view-state';
export declare function generateElements(view: EzDiagramView, state: EzVertexViewState, grow?: number): [EzConstraint[], EzPoint[], EzElement, () => void];
