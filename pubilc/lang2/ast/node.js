export class AbsNode {
    static table = new Map()
    static regist(cls) { AbsNode.table.set(cls.kind, cls) }

    static parse(object){
        const cls = AbsNode.table.get(object.kind)
        return cls.fromJsonObj(object)
    }

    static fromJsonObj(obj){
        const node = new this()
        node.setComment(obj.comment)
        return node
    }

    static kind = 'node'

    kind(){
        const { constructor } = Object.getPrototypeOf(this)
        return constructor.kind
    }

    constructor(){
        this._kind = this.kind()
    }

    // 节点信息
    #comment = ''
    setComment(comment = '') {
        this.#comment = comment
        return this
    }
    getComment() {
        return this.#comment || ''
    }

    clone() {
        const { constructor } = Object.getPrototypeOf(this)
        return new constructor().setComment(this.getComment())
    }

    toJsonObj(){
        return {
            kind:this.kind(),
            comment:this.getComment(),
        }
    }
}
export class AbsLeaf extends AbsNode { }

export class AbsBranch extends AbsNode {
    #children = []

    setChildren(c) {
        this.#children = c
        return this
    }

    getChildren() {
        return this.#children
    }

    clone() {
        const newone = super.clone()
        return newone.setChildren(this.#children.map(v=>v.clone()))
    }
}


window.AbsNode = AbsNode