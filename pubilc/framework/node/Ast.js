
import {
    TokenHeadNode, TokenSubHeadNode, TokenTailNode, TokenTextNode, TokenHtmlNode
} from "./Token.js"

import {
    ParserProgarmNode, ParserExprNode, ParserExprListNode, ParserNextNode, Parser
} from "./Parser.js"

import {
    TextNode, GroupNode, RootNode, HtmlNode
} from "./ViewNode.js"

import {
    BindEvents, BindDirectives, BindAttrs
} from './statement.js'

import {
    Func, Scope
} from './Func.js'

import * as rand from '/pubilc/utils/rand.js'

export class Ast {
    static gen(tmpl, argus) {
        const program = Parser.gen(tmpl)

        const toAstNodeList = (current, globe, parent = null) => {
            if (!current) {
                return []
            }

            if (current instanceof ParserProgarmNode) {
                const [node] = current.children
                const astNode = new AstRootNode(current, globe, parent)
                astNode.children = toAstNodeList(node, globe, astNode)
                return [astNode]
            }

            if (current instanceof ParserExprListNode) {
                const [expr, exprList] = current.children
                return [...toAstNodeList(expr, globe, parent), ...toAstNodeList(exprList, globe, parent)]
            }


            if (current instanceof ParserExprNode) {
                const [node, ...extra] = current.children

                if (node instanceof TokenHtmlNode) {
                    const astNode = new AstHtmlNode(node, globe, parent)
                    return [astNode]
                }

                if (node instanceof TokenTextNode) {
                    const astNode = new AstTextNode(node, globe, parent)
                    return [astNode]
                }

                if (node instanceof TokenHeadNode) {
                    const [exprlist, next] = extra
                    const astNode = new AstFragmentNode(node, globe, parent)
                    const astChildNode = new AstElemntNode(node, globe, astNode)

                    astChildNode.children = toAstNodeList(exprlist, globe, astChildNode)

                    astNode.children = [
                        astChildNode,
                        ...toAstNodeList(next, globe, parent)
                    ]
                    return [astNode]
                }
            }

            if (current instanceof ParserNextNode) {
                const [node, ...extra] = current.children
                if (node instanceof TokenTailNode) {
                    return []
                }
                if (node instanceof TokenSubHeadNode) {
                    const [exprlist, next] = extra
                    const astNode = new AstElemntNode(node, globe, parent)
                    astNode.children = toAstNodeList(exprlist, globe, astNode)
                    return [astNode, ...toAstNodeList(next, globe, parent)]
                }
            }
        }

        return toAstNodeList(program, new Scope(argus))[0]
    }
    scope = null
    children = []
    id = ''

    constructor(current, globe, parent) {
        this.id = 'el-' + rand.uuid()
        this.scope = Scope.extend(parent ? parent.scope : globe)
    }

}
export class AstRootNode extends Ast {

    render(pa = null, data) {
        const node = new RootNode()
        node.setChildren(this.children.flatMap(v => v.render(node, data)))
        return [node]
    }
}
export class AstTextNode extends Ast {
    #fn = null

    constructor(current, globe, parent) {
        super(current, globe, parent)
        this.#fn = new Func(this.scope, current.data.code)
    }
    render(pa = null, data) {
        const node = new TextNode(pa, this.#fn.apply(data))
        return [node]
    }
}
export class AstHtmlNode extends Ast {
    #content = ''
    constructor(current, globe, parent) {
        super(current, globe, parent)
        this.#content = current.content
    }

    render(pa = null, data) {
        const node = new HtmlNode(pa, this.#content)
        return [node]
    }
}
export class AstFragmentNode extends Ast {
    render(pa = null, data) {
        return this.children.reduceRight((next, current) => {
            return () => current.render(pa, data, next)
        }, () => [])()
    }
}
export class AstElemntNode extends Ast {
    #directives = null
    #events = null
    #attrs = null
    constructor(current, globe, parent) {
        super(current, globe, parent)

        this.#directives = new BindDirectives(
            current.data.directives,
            this.scope,
            scope => this.scope = scope
        )
        this.#events = new BindEvents(current.data.events, this.scope)
        this.#attrs = new BindAttrs(current.data.attrs, this.scope)
    }

    render(pa = null, _data, _next) {
        const { data, render, next } = this.#directives.applyElement(
            { data: _data, render: pa => new GroupNode(pa), next: _next }
        )

        let res = []

        if (render) {
            const node = render(pa)
            node.renderEvents(this.#events, data)
            node.renderAttrs(this.#attrs, data)
            node.renderChildren(this.children, data)
            res = [node]
        }

        if (next) {
            res = [...res, ...next()]
        }

        return res
    }

}




