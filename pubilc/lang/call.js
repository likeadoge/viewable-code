import { AstBranchNode, AstNode } from './base.js'


export class Call extends AstBranchNode {
    extra = { fn: null }
    children = []

    constructor(fn, children) {
        super()
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

    static run(node){
        const fn = node.extra.fn
        const argus = node.children
        const {use} = Object.getPrototypeOf(fn).constructor
    
        return use(fn,argus)
    }

    static render(c) {
        return `
        <div class="call expr" id="${c.eid}">
            <div class="fn" title="双击执行" ondblclick="fnEval('${c.eid}')">
            ${AstNode.render(c.extra.fn)}
            </div>
        
            <div>
            ${c.children.map(v => AstNode.render(v)).join('')}
            </div>
        </div>
        `
    }
}

export class Ref extends AstBranchNode {
    extra = { name: `` }
    children = []

    constructor(name) {
        super()
        this.extra.name = name
    }
}