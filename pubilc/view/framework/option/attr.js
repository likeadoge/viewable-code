import { get } from './base.js'

export class AttrOption {
    #map = new Map()

    set(name, value) {

        const v = name.split('')
        .map((v, i ,arr) => arr[i - 1] && (arr[i - 1] === '_')
            ? v.toLocaleUpperCase()
            : v)
        .filter(v => v !== '_')
        .join('')

        this.#map.set(v, value)
        return this
    }

    apply(dom) {
        const list = Array.from(this.#map.entries())
        list.forEach(([name, val]) => {
            dom[name] = val
        })
    }
}

export const attr = (c = new AttrOption()) => new Proxy(c, {
    get: (option, name) => name === get
        ? option
        : (value) => attr(option.set(name, value))
})