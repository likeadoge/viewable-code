import {GroupNode} from '../node/ViewNode.js'

export class LoopNode extends GroupNode {
    #targetList = []
    #children = []
    #indexField = null
    #valueField = null

    nodeList = []

    constructor(pa, {
        indexField,
        valueField,
        targetList,
        render
    }) {
        super(pa)
        this.#targetList = targetList
        this.#indexField = indexField
        this.#valueField = valueField
        this.#children = this.#targetList.map(() => render(this))
    }

    render() {
        this.remove()

        const target = document.createElement('template')
        target.innerHTML = this.#children.map(v => v.genHtml()).join('')

        this.#children.forEach(v => {
            v.render()
            v.insertTo(target.content)
        })

        this.nodeList = Array.from(target.content.childNodes)
    }

    renderAttrs(attr, data) {
        this.#targetList.forEach((value, index) => {
            this.#children[index].renderAttrs(attr, Object.assign(
                {}, data,
                this.#indexField ? { [this.#indexField]: index } : {},
                this.#valueField ? { [this.#valueField]: value } : {},
            ))
        })
    }
    renderEvents(event, data) {
        this.#targetList.forEach((value, index) => {
            this.#children[index].renderEvents(event, Object.assign(
                {}, data,
                this.#indexField ? { [this.#indexField]: index } : {},
                this.#valueField ? { [this.#valueField]: value } : {},
            ))
        })
    }
    renderChildren(astList, data) {
        this.#targetList.map((value, index) => {
            this.#children[index].renderChildren(astList, Object.assign(
                {}, data,
                this.#indexField ? { [this.#indexField]: index } : {},
                this.#valueField ? { [this.#valueField]: value } : {},
            ))
        })
    }
}

export const loop = ['loop', {
    onElementRender: (options, { data, render, next }) => {

        if (!render) return { data, render, next }

        const { input, fn } = options

        const newRender = (pa) => new LoopNode(pa, {
            valueField: input[0] || null,
            indexField: input[1] || null,
            targetList: fn.apply(data),
            render
        })

        return { data, render: newRender, next }
    }
}]