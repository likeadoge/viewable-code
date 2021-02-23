import { Value } from './base.js'

export class ValBool extends Value {

    static not(a) { return new ValBool(!a.#v) }
    static or(a, b) { return new ValBool(a.#v || b.#v) }
    static and(a, b) { return new ValBool(a.#v && b.#v) }
    static cond(a, b, c) { return a.#v ? b : c }

    #v = false

    get() { return this.#v }

    constructor(v) {
        super()
        this.#v = v
    }

    log() { return `${this.#v}` }
}

