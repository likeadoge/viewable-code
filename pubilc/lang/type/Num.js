import { AstLeafNode } from '../base.js'
import { LocalFunc } from './Func.js'

export default class Num extends AstLeafNode {
    kind = "num"
    extra = { n: 0 }
    constructor(n) {
        super()
        this.extra.n = n
    }
    clone() {
        return new Num(this.extra.n)
    }
    render() {
        return `<div class="num expr">${this.extra.n}</div>`
    }
    static css = {
        '.num': {
            background: 'LightSlateBlue',
            display: 'inline-block',
            padding: '0 12px',
            color: '#fff'
        }
    }

    static add = new LocalFunc('num:add', (a, b) => new Num(a.extra.n + b.extra.n))

    static sub = new LocalFunc('num:sub', (a, b) => new Num(a.extra.n - b.extra.n))

    static mul = new LocalFunc('num:mul', (a, b) => new Num(a.extra.n * b.extra.n))

    static div = new LocalFunc('num:div', (a, b) => new Num(a.extra.n / b.extra.n))
}
