import * as rand from '../utils/rand.js'


export class Expr {

    static nodes = new Map()
    static replace(oldone, newone) {
        const cntr = document.createElement('template')
        cntr.innerHTML = newone.render()
        const n_node = cntr.content.childNodes[0]
        const o_node = document.getElementById(oldone.eid)

        if (o_node) {
            o_node.after(n_node)
            o_node.remove()
        }
    }
    static css = `
        body{
            line-height:32px;
        }
        .expr{
            background:#66ccff;
            margin:4px;
        }
    `
    eid = ''
    kind = '(unknown)'

    constructor() {
        this.eid = `el-` + rand.uuid()
        Expr.nodes.set(this.eid, this)
    }
    render() {
        return `<div class="expr">(undone)</div>`
    }

}

export class Scope {
    static globe = new Scope()
    static runtime = new Scope()

    #map = new Map()

    set(name, value) {
        this.#map.set(name, value)
    }

    get(name) {
        if (!this.#map.has(name)) throw new Error(`${name} is undefined`)
        return this.#map.get(name)
    }
}

export class Num extends Expr {
    #n

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
            background:crimson;
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

export class Ref extends Expr {
    static css = `
        .expr.ref {
            display:inline-block;
            // background:#666;
            // color:#fff;
            color:#666;
            background:transparent;
            line-height:32px;
            padding: 0 12px;
        }
    `
    #name = ''
    constructor(name) {
        super()
        this.#name = name
    }

    render() {
        return `<div class="ref expr">{ ${this.#name} }</div>`
    }

    val(scope = Scope.globe) {
        return scope.get(this.#name)
    }
}

export class Def extends Expr {
    static css = `
        .expr.def {
            display:inline-block;
            line-height:32px;
        }
        .expr.def>.name{
            background:#666;
            padding: 0 12px;
            color:#fff;
        }
        .expr.def>.value{
            color:#666;
            border:4px solid #666;
            background:#fff;
        }
    `
    #name = ''
    #value = null
    constructor(name, value) {
        super()
        this.#name = name
        this.#value = value
    }

    render() {
        return `<div class="def expr">
            <div class="name">
                ${this.#name}
            </div>
            <div class="value">
            ${this.#value.render()}
            </div>
        </div>`
    }
}

export class Call extends Expr {
    #fn = null
    #argus = []
    static css = `
    .expr.call{ 
        background:#fff;
        border:1px solid #ccc;
        display:inline-block
    }

    .expr.call>.fn{
        background:#efefef;
        text-align:center;
        box-shadow: 0 0px 0px 0 rgb(0 0 0 / 0%);
        cursor:pointer;
        transition: all 0.3s ease-out;
    }

    .expr.call>.fn:hover{
        background:#cfcfcf;
        box-shadow: 0 1px 5px 0 rgb(0 0 0 / 30%);
    }
    `
    constructor(fn, argus) {
        super()
        this.#fn = fn
        this.#argus = argus
    }

    render() {
        return `
        <div class="call expr" id="${this.eid}">
            <div class="fn" title="ondblclick = fnEval()" ondblclick="fnEval('${this.eid}')">
            ${this.#fn.render()}
            </div>
        
            <div>
            ${this.#argus.map(v => v.render()).join('')}
            </div>
        </div>
        `
    }

    eval() {
        const argus = this.#argus.map(v => {
            if (v instanceof Call) {
                return v.eval()
            }
            if (v instanceof Expr) {
                return v
            }
            throw new Error('type error of expr')
        })

        const fn = this.#fn instanceof Ref ? this.#fn.val() : this.#fn

        if (fn instanceof Func) {
            const node = fn.apply(argus)
            Expr.replace(this, node)
            return node
        }

        throw new Error('not function!!!')
    }
}


export class Func extends Expr {
    apply() { }
}

export class LocalFunc extends Func {
    #fn = () => { }
    constructor(name, fn) {
        super()
        this.#fn = fn
        Scope.globe.set(name, this)
    }

    apply(argus) {
        return this.#fn(...argus)
    }
}



new LocalFunc('+', ((a, b) => Num.add(a, b)))
new LocalFunc('-', ((a, b) => Num.sub(a, b)))
new LocalFunc('*', ((a, b) => Num.mul(a, b)))
new LocalFunc('/', ((a, b) => Num.div(a, b)))
new LocalFunc('log', ((a) => (console.log(a), a)))
new LocalFunc('lines', ((...argus) => argus.reduce((a,b)=>b)))

const style = document.createElement('style')

style.innerHTML = [Expr, Num, Ref, Def, Call]
    .map(v => v.css || '')
    .join('')

document.head.appendChild(style)

window.Expr = Expr

window.fnEval = (id) => {
    Expr.nodes.get(id).eval()
}