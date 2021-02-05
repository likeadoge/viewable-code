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

    render() {
        return `<div>${this.extra.name}</div>`
    }

    apply( argus){
        const { name } = this.extra
        const _fn = LocalFunc.libs.get(name)
        if (!_fn) throw new Error(`local_fn:${name} is undefined!`)
        return _fn(...argus)
    }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   