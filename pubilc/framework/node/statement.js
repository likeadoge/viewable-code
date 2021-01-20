
import { Func, Scope } from './Func.js'
import { Directive } from '../directive/_index.js'

export class ScanAttr {
    static re = `\\[\\s*\\w+(?:\\-\\w+)*\\s*\\](?:\\s*=\\s*"[\\w|\\W]*?")?`
    field = ""
    value = null

    constructor(content) {
        const [c, field, value] = content.match(`\\[\\s*(\\w+(?:\\-\\w+)*)\\s*\\](?:\\s*=\\s*"([\\w|\\W]*?)")?`)
        this.field = field
        this.value = (value || value === '') ? value : 'true'
        // console.log('Attr', this)
    }
}
export class ScanEvent {
    static re = `\\{\\s*\\w+(?:\\-\\w+)*\\s*\\}(?:\\s*=\\s*"[\\w|\\W]*?")?`
    field = ""
    value = null
    constructor(content) {
        const [c, field, value] = content.match(`\\{\\s*(\\w+(?:\\-\\w+)*)\\s*\\}(?:\\s*=\\s*"([\\w|\\W]*?)")?`)
        this.field = field
        this.value = (value || value === '') ? value : 'true'
        // console.log('Attr', this)
    }
}
export class ScanDirective {
    static re = `\\w+(?:\\-\\w+)*(?:<\\w+(?:,\\w+)*>)?(?:\\s*=\\s*"[\\w|\\W]*?")?`
    field = ""
    input = []
    value = null
    constructor(content) {
        const [c, field, input, value] = content.match(`(\\w+(?:\\-\\w+)*)(?:<(\\w+(?:,\\w+)*)>)?(?:\\s*=\\s*"([\\w|\\W]*?)")?`)
        this.field = field
        this.input = input ? input.split(',').map(v => v.trim()) : []
        this.value = (value || value === '') ? value : 'true'
    }
}
export class BindEvents {
    #list = []
    #scope = null
    constructor(list = [], scope) {
        this.#scope = scope
        this.#list = list.map(({ value, field }) => ({
            type: field,
            fn: new Func(this.#scope, value)
        }))

    }

    apply(node, data) {
        this.#list.forEach(({ type, fn }) => {
            node.bindEvent(type, fn.apply(data))
        })
    }
}
export class BindAttrs {
    #list = []
    #scope = null
    constructor(list = [], scope) {
        this.#scope = scope
        this.#list = list.map(({ value, field }) => ({
            name: field,
            fn: new Func(this.#scope, value)
        }))
    }
    apply(node, data) {
        this.#list.forEach(({ name, fn }) => {
            node.setAttr(name, fn.apply(data))
        })
    }
}
export class BindDirectives {
    #table = {}
    #scope = null
    constructor(list = [], scope, setScope) {
        this.#scope = Scope.extend(scope, list.flatMap(v => v.input))
        setScope(this.#scope)

        this.#table = list.map(({ value, input, field }) => ({
            type: field,
            input,
            fn: new Func(this.#scope, value)
        })).reduce((r, v) => Object.assign({}, r, { [v.type]: v }), {})
    }
    getScope() {
        return this.scope
    }

    applyElement({ data, render, next }) {
        return Directive.renderElement(this.#table,{ data, render,next})
    }

}
