

export class ViewNode {
    parent = null
    anchorId = ''
    nodeList = []

    constructor(anchorId, parent = null) {
        this.anchorId = anchorId
        this.parent = parent
    }

    genHtml() { return `<template id="${this.anchorId}"></template>` }

    render() {
        this.remove()
        this.nodeList = []
    }

    insertTo(target) {
        const anchor = target.querySelector(`#${this.anchorId}`)
        if (anchor) {
            const fragment = document.createDocumentFragment()
            this.nodeList.forEach(v => fragment.appendChild(v))
            anchor.after(fragment)
        } else {
            console.warn('AnchorElement is not found!', this)
        }
    }

    remove() {
        this.nodeList.forEach(v => v.remove())
    }
}

export class TextNode extends ViewNode {
    nodeList = []
    text = ''
    constructor(pa, text) {
        super(`el_${Math.floor(Math.random() * 1e17)}`, pa)
        this.text = text
    }
    render() {
        this.remove()

        this.nodeList = [document.createTextNode(this.text)]
    }
}

export class HtmlNode extends ViewNode {
    html = ''
    constructor(pa, html) {
        super(`el_${Math.floor(Math.random() * 1e17)}`, pa)
        this.html = html
    }

    genHtml() {
        return this.html
    }

    render() { }

    insertTo() { }

    remove() { }
}

export class GroupNode extends ViewNode {
    nodeList = []

    #children = []
    #attr = {}
    #event = {}

    constructor(pa) {
        super(`el_${Math.floor(Math.random() * 1e17)}`, pa)
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

        // 添加属性
        this.nodeList.filter(v => v.setAttribute).forEach(element => {
            Object.entries(this.#attr).forEach(([name, value]) => {
                element.setAttribute(name, value)
            })
        })

        // 绑定事件
        this.nodeList.filter(v => v.addEventListener).forEach(element => {
            Object.entries(this.#event).forEach(([type, listener]) => {
                element.addEventListener(type, listener)
            })
        })
    }
    setAttr(name, value) {
        this.#attr[name] = value
    }
    bindEvent(type, event) {
        this.#event[type] = event
    }

    renderAttrs(attr, data) {
        attr.apply(this, data)
    }
    renderEvents(event, data) {
        event.apply(this, data)
    }

    renderChildren(astList, data) {
        this.#children = astList.flatMap(v => v.render(this, data))
    }

}

export class RootNode extends ViewNode {
    #children = []
    constructor(pa) {
        super(`el_${Math.floor(Math.random() * 1e17)}`, pa)
    }

    setChildren(list) {
        this.#children = list
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

    mount(cntr) {
        this.render()
        if (cntr && cntr.appendChild) {
            const fragment = document.createDocumentFragment()
            this.nodeList.forEach(v => fragment.appendChild(v))
            cntr.appendChild(fragment)
        } else {
            console.warn('cntr is not a element!', this)
        }
    }


}

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

