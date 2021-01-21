// const evalFunc = (body) => {
//     console.log(body)
//     return new Function(body)
// }

// const add = (a, b) => `(${a} + ${b})`

// const div = (a, b) => `(${a} / ${b})`

// const sub = (a, b) => `(${a} - ${b})`

// const mul = (a, b) => `(${a} * ${b})`

// const lines = (...item) => item.join(`;\n`)

// const log = (v) => `console.log(${v})`

// const globe = new Set()

// const def = (name, val) => {
//     globe.add(name)
//     return `const ${name} = ${val}`
// }

// const val = (name) => {
//     if (!globe.has(name)) throw new Error(`${name} is undefined!!!`)
//     return name
// }



export class Expression { }

export class Num extends Expression {
    #val
    constructor(val) {
        super()
        this.#val = val
    }

    eval() {
        return this.#val
    }
}

const runtime = new Map()

export class Call extends Expression {
    #argus
    #ref
    constructor(ref, argus = []) {
        super()
        this.#ref = ref
        this.#argus = argus
    }
    eval() {
        if (!runtime.has(this.#ref)) throw new Error(`${this.#ref} is undefined!!!`)
        const fn = runtime.get(this.#ref)
        return fn(...this.#argus.map(v => v.eval()))
    }
}

const globe = new Map()

export class Ref extends Expression {
    #id
    constructor(id) {
        super()
        this.#id = id
    }
    eval() {
        if (!globe.has(this.#id)) throw new Error(`${this.#id} is undefinded!!!`)
        return globe.get(this.#id).eval()
    }
}

export class Func extends Expression{
    #id
    constructor(id) {
        super()
        this.#id = id
    }
    eval() {
        if (!globe.has(this.#id)) throw new Error(`${this.#id} is undefinded!!!`)
        return globe.get(this.#id).eval()
    }
}

const def = (name, val) => {
    globe.set(name, val)
    return new Ref(name)
}

const val = (name) => new Ref(name)

const num = val => new Num(val)

const add = ((ref) => {
    runtime.set(ref, (a, b) => (a + b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('add'))

const sub = ((ref) => {
    runtime.set(ref, (a, b) => (a - b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('sub'))

const mul = ((ref) => {
    runtime.set(ref, (a, b) => (a * b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('mul'))

const div = ((ref) => {
    runtime.set(ref, (a, b) => (a / b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('div'))

const lines = ((ref) => {
    runtime.set(ref, (...argus) => argus.reduce((_, b) => b))
    return (...argus) => new Call(ref, argus)
})(Symbol('lines'))

const log = ((ref) => {
    runtime.set(ref, (val) => {
        console.log(val)
        return val
    })
    return (val) => new Call(ref, [val])
})(Symbol('log'))

const apply = (fn) => {

}

const evalFunc = (a) => {
    console.log(a)
    return () => a.eval()
}


export const main = evalFunc(lines(
    def('value', add(num(1), num(2)), num(3)),
    // def('add_1', func(argus(x), num(2)), num(3))),
    log(div(sub(mul(add(num(1), val('value')), num(3)), num(4)), num(5)))
))
