import { Sym, SymCall, SymValue } from './base.js'
import { runtime } from '../env/runtime.js'
import { ValFunc } from '../val/func.js'
import { Scope } from '../env/scope.js'
import { Value } from '../val/base.js'

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
        return super.clone().set(this.#name)
    }
}


export class SymLambda extends SymValue {

    static gen(argus, body) { return new SymLambda().setArgus(argus).setBody(body) }

    #argus = []
    #body = null

    toJsonObj() {
        return {
            type: 'local',
            argus: this.#argus,
            call: this.#body.toJsonObj()
        }
    }

    setArgus(argus) {
        this.#argus = argus
        return this
    }

    getArgus() {
        return this.#argus
    }

    setBody(body) {
        this.#body = body
        return this
    }

    getBody() {
        return this.#body
    }

    val() {
        const recur = (s, scope) => {
            if (s instanceof SymCall) {
                return s.setList(s.getList().map(v => recur(v, scope)))
            } else if (s instanceof Sym) {
                return s.setScope(scope)
            } else if (s instanceof Value) {
                return s
            } else {
                console.log(s)
                throw new Error('type error!')
            }
        }

        return new ValFunc((...argus) => {
            const scope = new Scope(this.getScope())
            this.#argus.forEach((name, i) => {
                scope.set(name, argus[i])
            })

            const call = recur(this.#body.clone(), scope)

            return call
        })
    }

    clone() {
        return super.clone().setArgus(this.#argus).setBody(this.#body.clone())
    }
}





