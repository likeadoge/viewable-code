import { AstLeafNode } from '../base.js'

export class LocalFunc extends AstLeafNode {
    kind = "local_func"
    extra = { name: '' }

    constructor(name, fn) {
        super()
        this.extra.name = name
        LocalFunc.libs.set(name, fn)
    }

    static libs = new Map()

    static render(c) {
        return `<div>${c.extra.name}</div>`
    }

    static use = (fn,argus) => {
        const {name} = fn.extra
        const _fn = LocalFunc.libs.get(name)
        if(!_fn) throw new Error (`local_fn:${name} is undefined!`)
        return _fn(...argus)
    }
}
