import { SymValue } from './base.js'
import { ValBool } from '../val/bool.js'

export class SymBool extends SymValue {
    #val = false

    static gen(v){
        return new SymBool().set(v)
    }

    toJsonObj() {
        return {
            type: 'obj',
            val: this.#val
        }
    }

    set(v) {
        this.#val = v
        return this
    }

    get() {
        return this.#val
    }

    val() {
        return new ValBool(this.#val)
    }

    clone() {
        return super.clone().set(this.#val)
    }
}