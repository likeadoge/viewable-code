export class ReactZone {

    #val = null

    #target = []

    #emitters = []

    #emitter = new Emitter(() => this.#update())

    #transform = () => { }

    val() { return this.#val }


    constructor(list, transform) {
        this.#target = list
        this.#transform = transform
        this.#target.forEach(v => v instanceof ReactZone ? v.listen(this.#emitter) : null)
        this.#val = this.#transform(...this.#target.map(v => v instanceof ReactZone ? v.val() : v))
    }

    #update() {
        const newVal = this.#transform(...this.#target.map(v => v instanceof ReactZone ? v.val() : v))
        if ((!newVal instanceof Object || newVal === null) && newVal === this.val) {
            return
        } else {
            this.#val = newVal
            this.#emitters.forEach(v => v.emit())
        }
    }

    modify(fn = v => v) {
        this.#target = this.#target.map((v, i) => fn(v, i))
        this.#update()
        return this
    }

    modifyArray(fn = (...arg) => arg) {
        this.#target = fn(...this.#target)
        this.#update()
        return this
    }

    listen(emitter) {
        this.#emitters.push(emitter)
    }

    map(fn) {
        return new ReactZone([this], fn)
    }
}

export const rZone = (...args) => new ReactZone(args, v => v)

export const rZlist = (...args) => new ReactZone(args, (...v) => v)



export class Emitter {
    constructor(cb) { this.#cb = cb }
    #cb = () => { }
    emit() { this.#cb() }
}