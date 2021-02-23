import { Value } from './base.js'

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
