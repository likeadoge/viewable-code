import { AstLeafNode, AstBranchNode } from '../base.js'
import { Scope } from '../Scope.js'
import { WithContext } from '../interface.js'

export class Func extends AstLeafNode {
    regist(scope) { }
    apply(argus) { }
}

export class LocalFunc extends Func {
    kind = "local_func"
    extra = { name: '' }

    clone() {
        return new LocalFunc(this.extra.name)
    }

    constructor(name, fn) {
        super()
        this.extra.name = name
        if (fn) {
            LocalFunc.libs.set(name, fn)

        }
    }

    static libs = new Map()

    render() {
        return `<div>${this.extra.name}</div>`
    }

    apply(argus) {

        argus.forEach(element => {
            AstLeafNode.assert(element)
        })

        const { name } = this.extra
        const _fn = LocalFunc.libs.get(name)
        if (!_fn) throw new Error(`local_fn:${name} is undefined!`)
        return _fn(...argus)
    }
}

export class Lambda extends Func {
    extra = {
        argus: [],
        body: null
    }

        ;[WithContext.key] = WithContext.def()

    clone() {
        return new Lambda(this.extra.argus, this.extra.body)
    }

    constructor(argus, body) {
        super()
        this.extra.argus = argus
        this.extra.body = body
    }

    apply(argus) {
        const scope = new Scope(this[WithContext.key].getScope())
        this.extra.argus.forEach((name, index) => {
            scope.set(name, argus[index])
        })

        const step = (node) => {

            if (node[WithContext.key]) {
                node[WithContext.key].init(scope)
            }

            if (node instanceof AstBranchNode) {
                node.children.forEach(v => step(v))
            }

            return node
        }

        return step(this.extra.body.clone())
    }

    static css = {
        '.expr.lambda': {
            border: "3px dashed #333",
            background: 'Plum'
        }
    }

    render() {
        return `
    <div class="expr lambda">
        <div class="argus">
            ${this.extra.argus.map(v => `${v}`).join(' , ')}
        </div>

        <div class="body">
            ${this.extra.body.render()}
        </div>
    </div>
    `
    }

}


