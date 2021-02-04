import { Num,Bool } from './type/index.js'
import { Call } from './call.js'
import { AstNode, AstLeafNode, AstBranchNode } from './base.js'

const css = [AstNode, Num, Call,Bool]
    .map(v => v.css)
    .flatMap(v => Object.entries(v))
    .map(([sel, values]) => `
        ${sel}{
            ${Object.entries(values)
            .map(([key, value]) => `${key.split('').map(v => v.toLocaleLowerCase() === v ? v : ('-' + v.toLocaleLowerCase())).join('')}:${value};`)
            .join('\n')}
        }
    `)
    .join(``)

const style = document.createElement('style')
style.innerHTML = css
document.body.appendChild(style)

export default class Program {

    #el = null

    #main = null

    constructor(main) {
        this.#main = main
        this.#el = document.getElementById('app') || document.createElement('div')
        this.#el.id = 'app'
        document.body.appendChild(this.#el)
    }

    render() {
        this.#el.innerHTML = AstNode.render(this.#main)
    }

    next() {
        this.#main = Program.next(this.#main)[1]
        ;console.log(this.#main)
        this.render()
    }

    static next(node) {
        if (node instanceof AstLeafNode)
            return [false, node]
        if (node instanceof AstBranchNode) {
            const { children } = node
            const [done, nextChildren] = children.reduce((r, v) => {
                const [done, above] = r
                if (done) {
                    return [done, above.concat([v])]
                } else {
                    const [done, next] = Program.next(v)
                    return [done, above.concat([next])]
                }
            }, [false, []])

            if (done) {
                node.children = nextChildren
                return [true, node]
            } else {

                return [true, AstBranchNode.run(node)]
            }
        }

    }

}