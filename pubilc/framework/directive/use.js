import { ViewNode } from '../node/ViewNode.js'

export class ComponentNode extends ViewNode {
    #component = null
    nodeList = []

    constructor(pa, {
        component
    }) {
        super(`el_${Math.floor(Math.random() * 1e17)}`,pa)
        this.#component = component
    }

    render() {
        this.remove()
        const instance = this.#component.gen()
        instance.node.viewNode.render()
        this.nodeList = instance.node.viewNode.nodeList
    }

    renderAttrs(attr, data) {
        // this.#targetList.forEach((value, index) => {
        //     this.#children[index].renderAttrs(attr, Object.assign(
        //         {}, data,
        //         this.#indexField ? { [this.#indexField]: index } : {},
        //         this.#valueField ? { [this.#valueField]: value } : {},
        //     ))
        // })
    }
    renderEvents(event, data) {
        // this.#targetList.forEach((value, index) => {
        //     this.#children[index].renderEvents(event, Object.assign(
        //         {}, data,
        //         this.#indexField ? { [this.#indexField]: index } : {},
        //         this.#valueField ? { [this.#valueField]: value } : {},
        //     ))
        // })
    }
    renderChildren(astList, data) {
        // this.#targetList.map((value, index) => {
        //     this.#children[index].renderChildren(astList, Object.assign(
        //         {}, data,
        //         this.#indexField ? { [this.#indexField]: index } : {},
        //         this.#valueField ? { [this.#valueField]: value } : {},
        //     ))
        // })
    }
}

export const use = ['use', {
    onElementRender: (options, { data, render, next }) => {

        if (!render) return { data, render, next }

        const { fn } = options

        const componentList =
            Array.from((data['_component'] || new Map()).entries())
                .reduce((o, [n, v]) => {
                    o[n] = v
                    return o
                }, {})
        console.log(fn)

        const newRender = (pa) => new ComponentNode(pa, {
            component: fn.dynamicApply(componentList)
        })

        return { data, render: newRender, next }
    }
}]