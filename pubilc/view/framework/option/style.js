import { get } from './base.js'

export class StyleOption {
    #map = new Map()

    set(name, value) {
        this.#map.set(name, value)
        return this
    }
}


export const styl = (c = new StyleOption()) => new Proxy(c, {
    get: (option, name) => (value) =>
        name === get ?
            option :
            styl(option.set(name, value))
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           