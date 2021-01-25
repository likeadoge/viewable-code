export class Expr {
    kind = '(unknown)'
    static css = `
    body{
        line-height:32px;
    }
    .expr{
        background:#66ccff;
        margin:4px;
    }
    `
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

    render(){
        return `<div class="num expr">${this.#n}</div>`
    }
}

export class Ref extends Expr {
    static css = `
        .expr.ref {
            display:inline-block;
            background:#666;
            color:#fff;
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
        return `<div class="ref expr">${this.#name}</div>`
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
    }
    `
    constructor(fn, argus) {
        super()
        this.#fn = fn
        this.#argus = argus
    }

    render() {
        return `
        <div class="call expr">
            <div class="fn">
            ${this.#fn.render()}
            </div>
        
            <div>
            ${this.#argus.map(v => v.render()).join('')}
            </div>
        </div>
        `
    }
}

export class Lines extends Expr {
    static css = `
    .lines{
        border:4px solid #ccc
    }
    .lines>.line{
        border-top: 4px dashed #ccc;
    }
    
    .lines>.line:first-child{
        border-top: none;
    }
    `

    #list = []
    constructor(list) {
        super()
        this.#list = list
    }

    render() {
        return `
            <div class="lines">
                ${this.#list.map(v => `
                        <div class="line">
                            ${v.render()}
                        </div>    
                    `).join('')
            }
            </div>
        `
    }
}

const style = document.createElement('style')

style.innerHTML = [Expr, Num, Ref, Def, Call, Lines]
    .map(v => v.css || '')
    .join('')

document.head.appendChild(style)
