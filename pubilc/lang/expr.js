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



export class Def extends AstBranchNode {


    static css = {
        '.expr.def': {
            display: 'inline-block',
            lineHeight: '32px',
        },
        '.expr.def>.name': {
            background: '#666',
            padding: '0 12px',
            color: "#fff",
        },
        ".expr.def>.value": {
            color: '#666',
            border: '4px solid #666',
            background: '#fff',
        }
    }

    extra = { name: '' }
    children = []

    constructor(name, value) {
        super()
        this.extra.name = name
        this.children = [value]
    }

    ;[WithContext.key] = WithContext.def()

        ;[EvalAble.key]() {
            const scope = this[WithContext.key].getScope()
            Scope.assert(scope)

            const [value] = this.children
            scope.set(this.extra.name, value && value[EvalAble.key] ? value[EvalAble.key]() : value)

            return scope.get(this.extra.name)
        }

    render() {
        return `<div class="def expr">
                <div class="name">
                    ${this.extra.name}
                </div>
                <div class="value">
                ${this.children[0].render()}
                </div>
            </div>`
    }
    clone() {
        return new Ref(this.extra.name, this.children[0])
    }
}