import { Num, Bool } from './baseType'
import { LocalFunc } from './funcType'

export class Scope {
    static runtime = new Scope()
    static globe = new Scope(Scope.runtime)

    #parent = null
    constructor(parent = null) {
        this.#parent = parent
    }

    #map = new Map()

    set(name, value) {
        this.#map.set(name, value)
    }

    get(name) {
        if (this.#map.has(name))
            return this.#map.get(name)
        if (this.#parent)
            return this.#parent.get(name)
        else
            throw new Error(`${name} is undefined`)
    }

    has(name) {
        return (
            this.#map.has(name) || (this.#parent && this.#parent.has(name))
        )
    }
}

Scope.runtime.set('+', new LocalFunc((a, b) => Num.add(a, b)))
Scope.runtime.set('-', new LocalFunc((a, b) => Num.sub(a, b)))
Scope.runtime.set('*', new LocalFunc((a, b) => Num.mul(a, b)))
Scope.runtime.set('/', new LocalFunc((a, b) => Num.div(a, b)))
Scope.runtime.set('&&', new LocalFunc((a, b) => Bool.and(a, b)))
Scope.runtime.set('||', new LocalFunc((a, b) => Bool.or(a, b)))
Scope.runtime.set('!not', new LocalFunc((a) => Bool.not(a)))
Scope.runtime.set('log', new LocalFunc((a) => (console.log(a), a)))
Scope.runtime.set('lines', new LocalFunc((...argus) => argus.reduce((a, b) => b)))


