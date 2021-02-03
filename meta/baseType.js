import { abs_Value } from './base'

export class Mum extends abs_Value {
    #n = 0

    static add(a, b) {
        return new Num(a.#n + b.#n)
    }

    static sub(a, b) {
        return new Num(a.#n - b.#n)
    }

    static mul(a, b) {
        return new Num(a.#n * b.#n)
    }

    static div(a, b) {
        return new Num(a.#n / b.#n)
    }

    static css = `
        .expr.num{
            background:LightSlateBlue;
            display:inline-block;
            padding:0 12px;
            color:#fff;
        }
    
    `

    constructor(n) {
        super()
        this.#n = n
    }

    render() {
        return `<div class="num expr">${this.#n}</div>`
    }
}

export class Bool extends abs_Value {
    #n = false

    static and(a, b) {
        return new Bool(a.#n && b.#n)
    }

    static or(a, b) {
        return new Bool(a.#n || b.#n)
    }

    static not(a) {
        return new Bool(!a.#n)
    }

    static css = `
        .expr.bool{
            background:crimson;
            display:inline-block;
            padding:0 12px;
            color:#fff;
            text-align:center;
        }
        .expr.bool.true{
            background:aquamarine;
            color:#333;
        }
        .expr.bool.false{
            background:crimson;
        }
    
    `

    constructor(n) {
        super()
        this.#n = n
    }

    render() {
        return `<div class="bool expr ${this.#n}">${this.#n}</div>`
    }
}



