import { get } from './base.js'

export class StyleOption {
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
            dom.style[name] = val
        })
    }
}


export const styl = (c = new StyleOption()) => new Proxy(c, {
    get: (option, name) => name === get
        ? option
        : (value) => styl(option.set(name, value))
})
