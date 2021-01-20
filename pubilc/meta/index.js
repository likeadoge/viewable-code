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



export class Value {

}


export class Num extends Value {
    #val
    constructor(val) {
        super()
        this.#val = val
    }

    eval() {
        return this.#val
    }
}

export class Call extends Value {
    static funcs = new Map()
    #argus
    #ref
    constructor(ref, argus = []) {
        super()
        this.#ref = ref
        this.#argus = argus
    }
    eval() {
        if (!Call.funcs.has(this.#ref)) throw new Error(`${this.#ref} is undefined!!!`)
        const fn = Call.funcs.get(this.#ref)
        return fn(...this.#argus.map(v => v.eval()))
    }
}



const num = val => new Num(val)

const add = ((ref) => {
    Call.funcs.set(ref, (a, b) => (a + b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('add'))

const sub = ((ref) => {
    Call.funcs.set(ref, (a, b) => (a - b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('sub'))

const mul = ((ref) => {
    Call.funcs.set(ref, (a, b) => (a * b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('mul'))

const div = ((ref) => {
    Call.funcs.set(ref, (a, b) => (a / b))
    return (a, b) => new Call(ref, [a, b])
})(Symbol('div'))

const lines = ((ref) => {
    Call.funcs.set(ref, (...argus) => argus.reduce((_, b) => b))
    return (...argus) => new Call(ref, argus)
})(Symbol('lines'))


const log = ((ref) => {
    Call.funcs.set(ref, (val) => {
        console.log(val)
        return val
    })
    return (val) => new Call(ref, [val])
})(Symbol('log'))



const evalFunc = (a)=>{
    console.log(a)
  return  ()=> a.eval()
}


export const main = evalFunc(lines(
    // def('value', (add(num(1), num(2)), num(3))),
    log(div(sub(mul(add(num(1), num(2)), num(3)), num(4)), num(5)))
))
