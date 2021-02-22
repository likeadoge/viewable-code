import { SymValue } from './base.js'
import { ValNum } from '../val/num.js'

export class SymNum extends SymValue {
    #val = 0

    static gen(v){
        return new SymNum().set(v)
    }

    toJsonObj() {
        return {
            type: 'num',
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
        return new ValNum(this.#val)
    }

    clone() {
        return new SymNum().set(this.#val)
    }
}