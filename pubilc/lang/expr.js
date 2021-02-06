import { AstBranchNode } from './base.js'
import { Scope } from './Scope.js'
import { Func } from './type/Func.js'
import { EvalAble, WithContext } from './interface.js'

export class Call extends AstBranchNode {

    children = []

    constructor(fn, children) {
        super()
        Func.assert(fn)
        this.children = [fn, ...children]
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

    ;[EvalAble.key]() {
        const [fn, ...argus] = this.children
        return fn.apply(argus)
    }

    render() {
        const [fn, ...argus] = this.children
        return `
        <div class="call expr" id="${this.eid}">
            <div class="fn" title="双击执行" ondblclick="fnEval('${this.eid}')">
            ${fn.render()}
            </div>
        
            <div>
            ${argus.map(v => v.render()).join('')}
            </div>
        </div>
        `
    }

    clone() {
        const [fn, ...argus] = this.children
        return new Call(fn, argus)
    }
}


export class Ref extends AstBranchNode {

    extra = { name: '' }

    constructor(name) {
        super()
        this.extra.name = name
    }

    ;[WithContext.key] = WithContext.def()

    ;[EvalAble.key]() {
        const scope = this[WithContext.key].getScope()
        Scope.assert(scope)
        return scope.get(this.extra.name)
    }

    render() {
        return `<div>{{${this.extra.name}}}</div>`
    }
    clone() {
        return new Ref(this.extra.name)
    }
}
