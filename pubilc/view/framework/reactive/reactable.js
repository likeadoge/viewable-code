export class Reactable {

    #val = null

    #target = []

    #emitters = []

    #emitter = new Emitter(() => this.#update)

    #transform = () => { }

    val() { return this.#val }


    constructor(list, transform) {
        this.#target = list
        this.#transform = transform
        this.#target.forEach(v => v instanceof Reactable ? v.listen(this.#emitter) : null)
        this.#val = this.#transform(...this.#target.map(v => v instanceof Reactable ? v.val() : v))
    }

    #update() {
        const newVal = this.#transform(...this.#target.map(v => v instanceof Reactable ? v.val() : v))
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
}
export class Emitter {
    constructor(cb) { this.#cb = cb }
    #cb = () => { }
    emit() { this.#cb() }
} 