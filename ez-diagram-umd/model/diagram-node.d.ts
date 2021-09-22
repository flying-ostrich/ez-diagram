export declare abstract class EzDiagramNode {
    private _id;
    private _type;
    private _parent;
    constructor(type?: string);
    /**
     * Getter id
     * @return {string}
     */
    get id(): string;
    /**
     * Setter id
     * @param {string} value
     */
    set id(value: string);
    /**
     * Getter type
     * @return {string}
     */
    get type(): string;
    /**
     * Setter type
     * @param {string} value
     */
    set type(value: string);
    /**
     * Getter parent
     * @return {EzDiagramNode}
     */
    get parent(): EzDiagramNode;
    /**
    * Setter parent
    * @param {EzDiagramNode} value
    */
    set parent(value: EzDiagramNode);
}
