import {AstLeafNode} from '../base.js'

export default class Num extends AstLeafNode {
    kind = "num"
    extra = { n:0 }
    constructor(n){
        super()
        this.extra.n = n
    }


    static render(v){
        return `<div class="num expr">${v.extra.n}</div>`
    }

    static css = {
        '.num':{
            background:'blue',
            display:'inline-block',
            padding:'0 12px',
            color:'#fff'
        }
    }

    static add(a, b) {
        return new Num(a.extra.n + b.extra.n)
    }

    static sub(a, b) {
        return new Num(a.extra.n - b.extra.n)
    }

    static mul(a, b) {
        return new Num(a.extra.n * b.extra.n)
    }

    static div(a, b) {
        return new Num(a.extra.n / b.extra.n)
    }
}
