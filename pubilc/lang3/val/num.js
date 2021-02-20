import { Value } from './base.js'
import { runtime } from '../env/runtime.js'
import { ValFunc } from './func.js'

export class ValNum extends Value {

    static add(a, b) { return new ValNum(a.#v + b.#v) }
    static sub(a, b) { return new ValNum(a.#v - b.#v) }
    static mul(a, b) { return new ValNum(a.#v * b.#v) }
    static div(a, b) { return new ValNum(a.#v / b.#v) }

    #v = 0

    get(){return this.#v}

    constructor(v) {
        super()
        this.#v = v
    }

    log() { return `${this.#v}` }
}


runtime.set('num:add', new ValFunc((a, b) => ValNum.add(a, b)))
runtime.set('num:sub', new ValFunc((a, b) => ValNum.sub(a, b)))
runtime.set('num:mul', new ValFunc((a, b) => ValNum.mul(a, b)))
runtime.set('num:div', new ValFunc((a, b) => ValNum.div(a, b)))