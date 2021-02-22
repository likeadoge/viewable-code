import { SymValue } from './base.js'
import { Scope } from '../env/scope.js'
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
        return Scope.globe.get(this.#name)
    }

    clone() {
        return new SymRefer().set(this.#name)
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
            Scope.globe.set(this.#name, v)
            return v
        })
    }

    clone() {
        return new SymDefine().set(this.#name)
    }
}