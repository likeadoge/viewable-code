import { AstBranchNode } from './base.js'
import { Scope } from './Scope.js'
import { Func } from './type/Func.js'

export class EvalNode extends AstBranchNode {
    #scope = null

    setScope(scope) {
        this.#scope = scope
    }

    getScope() {
        return this.#scope
    }
}



export class Call extends EvalNode {
    extra = { fn: null }
    children = []

    constructor(fn, children) {
        super()
        Func.assert(fn)
        this.extra.fn = fn
        this.children = children
    }

    static css = {
        '.call': {
            background: '#fff',
            border: '1px solid #ccc',
            display: 'inline-block'
        },

        '.call>.fn': {
            background: '#efefef',
            textAlign: 'center',
            boxShadow: ' 0 0px 0px 0 rgb(0 0 0 / 0%)',
            cursor: 'pointer',
            transition: 'all 0.3s ease-out',
        },

        '.call>.fn:hover': {
            background: '#cfcfcf',
            boxShadow: '0 1px 5px 0 rgb(0 0 0 / 30%)'
        }
    }

    eval() {
        return this.extra.fn.apply(this.children)
    }

    render() {
        return `
        <div class="call expr" id="${this.eid}">
            <div class="fn" title="双击执行" ondblclick="fnEval('${this.eid}')">
            ${this.extra.fn.render()}
            </div>
        
            <div>
            ${this.children.map(v => v.render()).join('')}
            </div>
        </div>
        `
    }

    clone() {
        return new Call(this.extra.fn, this.children.map(v => v.clone()))
    }
}


export class Ref extends EvalNode {

    extra = { name: '' }

    constructor(name) {
        super()
        this.extra.name = name
    }

    eval() {
        const scope = this.getScope()
        Scope.assert(scope)
        return scope.get(this.extra.name)
    }

    render() {
        return `<div>{{${this.extra.name}}}</div>`
    }
    clone(){
        return new Ref(this.extra.name)
    }
}
