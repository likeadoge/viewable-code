import { Value } from './base.js'

export class ValFunc extends Value {
    #fn = null

    constructor(fn) {
        super()
        this.#fn = fn
    }

    log() { return `${this.#fn}` }

    apply(argus) {
        return this.#fn(...argus)
    }
}