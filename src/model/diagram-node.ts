import { v4 } from 'uuid';

export abstract class EzDiagramNode {

    private _id:string;

    private _type:string;

    private _parent:EzDiagramNode;

    constructor(type?:string){
        this._id = v4();
        this._type = type;
    }

    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set id(value: string) {
        this._id = value;
    }

    /**
     * Getter type
     * @return {string}
     */
    public get type(): string {
        return this._type;
    }

    /**
     * Setter type
     * @param {string} value
     */
    public set type(value: string) {
        this._type = value;
    }

    /**
     * Getter parent
     * @return {EzDiagramNode}
     */
    public get parent(): EzDiagramNode {
        return this._parent;
    }
    
    /**
    * Setter parent
    * @param {EzDiagramNode} value
    */
    public set parent(value: EzDiagramNode) {
        this._parent = value;
    }

}