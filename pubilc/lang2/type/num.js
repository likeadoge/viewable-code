import { Value } from '../ast/value.js'
import { AbsNode } from '../ast/node.js'
import { LocalFunc } from './func.js'

export class Num extends Value {
    static kind = 'num'


    static fn = {
        add: LocalFunc.create('num:add', (a, b) => Num.gen(a.getVal() + b.getVal())),
        sub: LocalFunc.create('num:sub', (a, b) => Num.gen(a.getVal() - b.getVal())),
        mul: LocalFunc.create('num:mul', (a, b) => Num.gen(a.getVal() * b.getVal())),
        div: LocalFunc.create('num:div', (a, b) => Num.gen(a.getVal() / b.getVal())),
    }

    #val = 0

    setVal(v) {
        this.#val = v
        return this
    }

    getVal() {
        return this.#val
    }

    static gen(v) {
        return new Num().setVal(v)
    }

    static fromJsonObj(obj) {
        const n = super.fromJsonObj(obj)
        return n.setVal(obj.val)
    }

    toJsonObj() {
        return {
            ...super.toJsonObj(),
            val: this.getVal()
        }
    }

    clone() {
        const c = super.clone()
        return c.setVal(this.getVal())
    }
}

AbsNode.regist(Num)