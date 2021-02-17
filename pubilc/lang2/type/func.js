import { Value } from '../ast/value.js'
import { AbsNode } from '../ast/node.js'

class AbsFunc extends Value {
    static kind = 'func'
    apply() { throw new Error('func not find!') }
}

export class LocalFunc extends AbsFunc {
    static kind = 'loacl_func'

    static runtime = new Map()
    static regist(name, fn) {
        this.runtime.set(name, fn)
    }


    #fn = ``


    setFn(name) {
        this.#fn = name
        return this
    }

    apply(argus) {
        if (!LocalFunc.runtime.has(this.#fn)) {
            throw new Error(`loacl_function named ${this.#fn} is undefined!`)
        }
        const fn = LocalFunc.runtime.get(this.#fn)
        return fn(...argus)
    }

    getFn() {
        return this.#fn
    }

    static create(name, fn) {
        LocalFunc.regist(name, fn)
        return LocalFunc.gen(name)
    }

    static gen(name) {
        return new LocalFunc().setFn(name)
    }

    static fromJsonObj(obj) {
        const n = super.fromJsonObj(obj)
        return n.setFn(obj.fn)
    }

    toJsonObj() {
        return {
            ...super.toJsonObj(),
            fn: this.getFn()
        }
    }

    clone() {
        const c = super.clone()
        return c.setFn(this.getFn())
    }


}

AbsNode.regist(LocalFunc)