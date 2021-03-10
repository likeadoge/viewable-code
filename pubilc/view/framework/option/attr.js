import { get } from './base.js'
import { ReactZone, Emitter } from '../reactive/index.js'

export class AttrOption {
    #map = new Map()

    #domList = []

    set(name, value) {

        const key = name.split('')
            .map((v, i, arr) => arr[i - 1] && (arr[i - 1] === '_')
                ? v.toLocaleUpperCase()
                : v)
            .filter(v => v !== '_')
            .join('')

        this.#map.set(key, value)

        if (value instanceof ReactZone) {
            const emitter = new Emitter(() => {
                this.#domList.forEach(dom => this.#use(dom))
            })
            value.listen(emitter)
        }

        this.#map.set(key, value)
        return this
    }

    #use(dom) {
        const list = Array.from(this.#map.entries())
        list.forEach(([name, val]) => {
            dom[name] = val instanceof ReactZone ? val.val() : val
        })
    }

    apply(dom) {
        this.#domList = this.#domList.filter(v => v === dom).concat([dom])
        this.#use(dom)
    }
}

export const attr = (c = new AttrOption()) => new Proxy(c, {
    get: (option, name) => name === get
        ? option
        : (value) => attr(option.set(name, value))
})