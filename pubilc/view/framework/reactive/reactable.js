export class Reactable {

    #val = null

    #target = []

    #emitters = []

    #emitter = new Emitter(() => this.#update)

    #transform = () => { }

    val() { return this.#val }


    constructor(list) {
        this.#target = list
        this.#target.forEach(v => v instanceof Reactable ? v.listen(this.#emitter) : null)
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

    listen(emitter) {
        this.#emitters.push(emitter)
    }
}

export class Emitter {
    constructor(cb){this.#cb = cb}
    #cb = () => { }
    emit() { this.#cb() }
}