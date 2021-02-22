import { Sym } from './base.js'
import { runtime } from '../env/runtime.js'

export class SymLocalFunc extends Sym {

    static gen(v) { return new SymLocalFunc().set(v) }

    #name = ''

    toJsonObj() {
        return {
            type: 'local',
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
        return runtime.get(this.#name)
    }

    clone() {
        return new SymLocalFunc().set(this.#name)
    }
}


