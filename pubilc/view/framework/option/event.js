import { get } from './base.js'

export class EventOption {
    #map = new Map()

    set(name, value) {
        this.#map.set(name, value)
        return this
    }

    apply(dom){
        const list = Array.from(this.#map.entries())
        list.forEach(([name,val])=>{
            dom[name] = val
        })
    }
}

export const even = (c = new EventOption()) => new Proxy(c, {
    get: (option, name) => (value) =>
        name === get ?
            option :
            even(option.set(name, value))
})