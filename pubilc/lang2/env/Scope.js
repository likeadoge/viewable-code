export class Scope {
    static runtime = new Scope()
    static globe = new Scope(Scope.runtime)
    static assert(m){
        if(! m instanceof this) {
            console.error('it should be',this)
            throw new Error('AstNode type Error!')
        }
    }
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


