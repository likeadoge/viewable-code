import { AstLeafNode } from '../base.js'
import { LocalFunc } from './Func.js'


export default class Bool extends AstLeafNode {
    kind = "num"
    extra = { n: false }
    constructor(n) {
        super()
        this.extra.n = n
    }

    render() {
        return `<div class="bool expr ${this.extra.n}">${this.extra.n}</div>`
    }

    static css = {
        '.expr.bool': {
            background: 'crimson',
            display: 'inline-block',
            padding: '0 12px',
            color: '#fff',
            textAlign: 'center'
        },
        '.expr.bool.true': {
            background: 'aquamarine',
            color: '#333'
        },
        '.expr.bool.false': {
            background: 'crimson',
        }
    }

    static and = new LocalFunc('num:and', (a, b) => new Bool(a.extra.n && b.extra.n))

    static or = new LocalFunc('num:or', (a, b) => new Bool(a.extra.n || b.extra.n))

    static not = new LocalFunc('num:not', (a) => new Bool(!a.extra.n))

    static cond = new LocalFunc('num:div', (a, b, c) => a.extra.n ? b : c)
}
