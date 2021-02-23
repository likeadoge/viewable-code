import { SymValue } from './base.js'
import { ValFunc } from '../val/index.js'


export class SymRefer extends SymValue {

    #name = ``

    static gen(v) {
        return new SymRefer().set(v)
    }

    toJsonObj() {
        return {
            type: 'ref',
            name: this.#name
        }
    }

    set(v) {
        this.#name = v
        return this
    }

    get() {
        return this.#name
    }

    val() {
        return this.getScope().get(this.#name)
    }

    clone() {
        return super.clone().set(this.#name)
    }
}


export class SymDefine extends SymValue {

    static gen(v) { return new SymDefine().set(v) }

    #name = ''

    toJsonObj() {
        return {
            type: 'define',
            name: this.#name
        }
    }

    set(v) {
        this.#name = v
        return this
    }

    get() {
        return this.#name
    }

    val() {
        return new ValFunc(v => {
            this.getScope().set(this.#name, v)
            return v
        })
    }

    clone() {
        return super.clone().set(this.#name)
    }
}