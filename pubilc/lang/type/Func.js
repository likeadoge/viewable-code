import { AstLeafNode } from '../base.js'

export class LocalFunc extends AstLeafNode {
    kind = "local_func"
    extra = { name: '' }

    constructor(name, fn) {
        this.extra.name = name
        LocalFunc.libs.set(name, fn)
    }
    
    static libs = new Map()
}
