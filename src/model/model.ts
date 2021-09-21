import { EzPoint } from '.';
import { EzDirection } from '../constants';
import { EzConstraint } from './constraint/constraint';
import { EzDiagramNode } from './diagram-node';
import { EzEdge } from './edge/edge';
import { EzRectangle } from './rectangle';
import { EzVertex } from './vertex/vertex';

export const EZ_MODEL_ROOT_TYPE = 'EZ_MODEL_ROOT_TYPE';
export class EzModel {

    private _nodeMap:Map<string, EzDiagramNode> = new Map();

    public nodes:EzDiagramNode[] = [];

    isVertex(node:EzDiagramNode):boolean{
        return node instanceof EzVertex;
    }

    isEdge(node:EzDiagramNode):boolean {
        return node instanceof EzEdge;
    }

    addVertex(node:EzVertex):void {
        this._nodeMap.set(node.id, node);
        this.nodes.push(node);
    }

    removeVertex(node:EzVertex): boolean{
        const idx = this.nodes.indexOf(node);
        if(idx===-1) return false;
        this.nodes.splice(idx, 1);
        this._nodeMap.delete(node.id);
        return true;
    }

    /**
     * add edge 
     * @param node 
     */
    addEdge(node:EzEdge):void {
        this._nodeMap.set(node.id, node);
        if(node.source){
            node.source.edges.push(node);
        }
        if(node.target){
            node.target.edges.push(node);
        }
        this.nodes.push(node);
    }
    
    /**
     * remove edge 
     * @param node 
     * @returns 
     */
    removeEdge(node:EzEdge): boolean{
        const idx = this.nodes.indexOf(node);
        if(idx===-1) return false;
        this.nodes.splice(idx, 1);
        this._nodeMap.delete(node.id);

        if(node.source){
            this.removeVertex(node.source);
        }
        if(node.target){
            this.removeVertex(node.target);
        }
        return true;
    }

    /**
     * update or set related terminal vertex for edge
     * @param edge 
     * @param terminal 
     * @param constraint - terminal constraint 
     * @param isSource - is source point of vertex
     */
    updateTerminalVertex(edge:EzEdge, terminal:EzVertex, constraint:EzConstraint, isSource = false):void {
        if(isSource){
            edge.source = terminal;
            edge.sourceConstraint = constraint;
        }else {
            edge.target = terminal;
            edge.targetConstraint = constraint;
        }
        terminal.edges.push(edge);
    }

    /**
     * change z index oder for given node
     * @param node 
     * @param targetPosition
     *
     */
    changeOrder(node:EzDiagramNode, targetPosition):void {
        if(targetPosition<0) targetPosition = 0;
        if(targetPosition>this.nodes.length-1) targetPosition = this.nodes.length-1;
        const currentIndex = this.nodes.indexOf(node);
        const tmp = this.nodes[targetPosition];
        this.nodes[targetPosition] = node;
        this.nodes[currentIndex] = tmp;
    }

    /**
     * update bounds for vertex
     * @param vertex 
     * @param bounds 
     */
    updateBounds(vertex:EzVertex, bounds:EzRectangle):void {
        vertex.bounds = bounds;
    }

    /**
     * return all layout root 
     * @returns 
     */
    getLayoutRoots():EzVertex[] {
        const roots = [];
        this._nodeMap.forEach(node=>{
            if(node instanceof EzVertex && node.layout){
                roots.push(node);
            }
        });
        return roots;
    }

    /**
     * edge connect to source or target vertex
     * @param edge 
     * @param source 
     * @param sourcePosition 
     * @param target 
     * @param targetPosition 
     */
    connect(edge:EzEdge, source:EzVertex, sourcePosition:EzDirection|EzConstraint, target:EzVertex, targetPosition:EzDirection|EzConstraint):void {
        if(source){
            edge.source = source;
            if(sourcePosition instanceof EzConstraint){
                edge.sourceConstraint = sourcePosition;
            }else{
                edge.sourceConstraint = EzConstraint.createByDirection(sourcePosition);
            }
            edge.source.edges.push(edge);
        }
        if(target){
            edge.target = target;
            if(targetPosition instanceof EzConstraint){
                edge.targetConstraint = targetPosition;
            }else {
                edge.targetConstraint = EzConstraint.createByDirection(targetPosition);
            }
            edge.target.edges.push(edge);
        }
    }


    /**
     * set layout child
     * @param parent 
     * @param child 
     * @param direction 
     * @param connectEdge 
     */
    setLayoutChild(parent:EzVertex, child:EzVertex, direction = EzDirection.BOTTOM, connectEdge?:EzEdge):void {
        child.layoutParent = parent;
        child.layoutDirection = direction;
        if(parent.layoutChildren.indexOf(child)===-1){
            parent.layoutChildren.push(child);
        }
        if(connectEdge){
            switch(direction){
            case EzDirection.BOTTOM:
                this.connect(connectEdge, parent, EzDirection.BOTTOM, child, EzDirection.TOP);
                break;

            case EzDirection.LEFT:
                this.connect(connectEdge, parent, EzDirection.LEFT, child, EzDirection.RIGHT);
                break;

            case EzDirection.TOP:
                this.connect(connectEdge, parent, EzDirection.TOP, child, EzDirection.BOTTOM);
                break;

            case EzDirection.RIGHT:
                this.connect(connectEdge, parent, EzDirection.RIGHT, child, EzDirection.LEFT);
                break;
            }
        }

    }


    /**
     * change constarint for edge
     * @param edge 
     * @param constraint 
     * @param isSource 
     */
    changeConstraint(edge:EzEdge, constraint:EzDirection | EzConstraint, isSource = false):void {
        if(isSource){
            if(edge.source){
                if(constraint instanceof EzConstraint){
                    edge.sourceConstraint = constraint;
                    this.updateConstraintPoint(edge, edge.source, isSource);
                }else {
                    edge.sourceConstraint = EzConstraint.createByDirection(constraint);
                    this.updateConstraintPoint(edge, edge.source, isSource);
                }
            }else{
                if(__DEV__){
                    console.error('edge source not found');
                }
            }
        }else {
            if(edge.target){
                if(constraint instanceof EzConstraint){
                    edge.targetConstraint = constraint;
                    this.updateConstraintPoint(edge, edge.target, isSource);
                }else {
                    edge.targetConstraint = EzConstraint.createByDirection(constraint);
                    this.updateConstraintPoint(edge, edge.target, isSource);
                }
            }else {
                if(__DEV__){
                    console.error('edge target not found');
                }
            }
        }
    }

    updateConstraintPoint(edge:EzEdge, terminal:EzVertex, isSource=false):void {
        const bounds = terminal.bounds;
        if(isSource){
            const constraint = edge.sourceConstraint;
            const point = new EzPoint(bounds.x + bounds.width * constraint.percentX+constraint.offsetX, bounds.y + bounds.height * constraint.percentY+constraint.offsetY);
            edge.points[0] = point;
        }else {
            const constraint = edge.targetConstraint;
            const point = new EzPoint(bounds.x + bounds.width * constraint.percentX+constraint.offsetX, bounds.y + bounds.height * constraint.percentY+constraint.offsetY);
            edge.points[edge.points.length-1] = point;
        }
    }
}