import { EzDirection } from '../constants';
import { EzConstraint } from './constraint/constraint';
import { EzDiagramNode } from './diagram-node';
import { EzEdge } from './edge/edge';
import { EzRectangle } from './rectangle';
import { EzVertex } from './vertex/vertex';
export declare const EZ_MODEL_ROOT_TYPE = "EZ_MODEL_ROOT_TYPE";
export declare class EzModel {
    private _nodeMap;
    nodes: EzDiagramNode[];
    isVertex(node: EzDiagramNode): boolean;
    isEdge(node: EzDiagramNode): boolean;
    addVertex(node: EzVertex): void;
    removeVertex(node: EzVertex): boolean;
    /**
     * add edge
     * @param node
     */
    addEdge(node: EzEdge): void;
    /**
     * remove edge
     * @param node
     * @returns
     */
    removeEdge(node: EzEdge): boolean;
    /**
     * update or set related terminal vertex for edge
     * @param edge
     * @param terminal
     * @param constraint - terminal constraint
     * @param isSource - is source point of vertex
     */
    updateTerminalVertex(edge: EzEdge, terminal: EzVertex, constraint: EzConstraint, isSource?: boolean): void;
    /**
     * change z index oder for given node
     * @param node
     * @param targetPosition
     *
     */
    changeOrder(node: EzDiagramNode, targetPosition: any): void;
    /**
     * update bounds for vertex
     * @param vertex
     * @param bounds
     */
    updateBounds(vertex: EzVertex, bounds: EzRectangle): void;
    /**
     * return all layout root
     * @returns
     */
    getLayoutRoots(): EzVertex[];
    /**
     * edge connect to source or target vertex
     * @param edge
     * @param source
     * @param sourcePosition
     * @param target
     * @param targetPosition
     */
    connect(edge: EzEdge, source: EzVertex, sourcePosition: EzDirection | EzConstraint, target: EzVertex, targetPosition: EzDirection | EzConstraint): void;
    /**
     * set layout child
     * @param parent
     * @param child
     * @param direction
     * @param connectEdge
     */
    setLayoutChild(parent: EzVertex, child: EzVertex, direction?: EzDirection, connectEdge?: EzEdge): void;
    /**
     * change constarint for edge
     * @param edge
     * @param constraint
     * @param isSource
     */
    changeConstraint(edge: EzEdge, constraint: EzDirection | EzConstraint, isSource?: boolean): void;
    updateConstraintPoint(edge: EzEdge, terminal: EzVertex, isSource?: boolean): void;
}
