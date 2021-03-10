import { get } from './base.js'
import { ReactZone, Emitter } from '../reactive/index.js'

export class StyleOption {
    #map = new Map()
    #domList = []

    set(name, value) {
        const v = name.split('')
            .map((v, i, arr) => arr[i - 1] && (arr[i - 1] === '_')
                ? v.toLocaleUpperCase()
                : v)
            .filter(v => v !== '_')
            .join('')
        this.#map.set(v, value)

        
        if (value instanceof ReactZone) {
            const emitter = new Emitter(() => {
                this.#domList.forEach(dom => this.#use(dom))
            })
            value.listen(emitter)
        }

        return this
    }

    #use(dom) {
        const list = Array.from(this.#map.entries())
        list.forEach(([name, val]) => {
            dom.style[name] = val instanceof ReactZone ? val.val() : val
        })
    }

    apply(dom) {
        this.#domList = this.#domList.filter(v => v === dom).concat([dom])
        this.#use(dom)
    }
}


export const styl = (c = new StyleOption()) => new Proxy(c, {
    get: (option, name) => name === get
        ? option
        : (value) => styl(option.set(name, value))
})
