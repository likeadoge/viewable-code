import { ReactZone, Watcher } from './reactive.js'


export class Reactable {
    emiter = new Watcher(() => this.update())

    #updateEvent = null

    onUpdate(fn) {
        this.#updateEvent = fn
    }
    // 更新操作 
    update() {
        if (this.#updateEvent) this.#updateEvent()
    }

}

export class RText extends Reactable {
    #text = null
    setText(val) {
        if (val instanceof ReactZone) {
            val.addWatcher(this.emiter)
        }
        this.#text = val
    }
    getText() {
        return (
            this.#text instanceof ReactZone
                ? this.#text.val()
                : this.#text
        )
    }
}

export class ROption extends Reactable {
    #map = new Map
    each(cb) {
        for (const [name, value] of this.#map.entries()) {
            cb(name, value instanceof ReactZone ? value.val() : value)
        }
    }
    add(name, val) {
        if (val instanceof ReactZone) {
            // 添加监听，修改的时候进行更新
            val.addWatcher(this.emiter)
        }
        this.map.add(name, val)
        return this
    }
}

export class RNodeGroup extends Reactable {
    #list = []
    getList() {
        return this.#list.map(
            v => v instanceof RNodeGroup ? v.getList()
                : v instanceof RNode ? v
                    : new Error('should be rNode!'))
    }

    setList(list) {
        this.#list = list
        this.#list.forEach(v => {
            if (v instanceof RNodeGroup) {
                v.onUpdate(function () {
                    this.emiter.emit()
                })
            }
        })
    }
}

export class RNode {
    #tag = 'div'

    #children = new RNodeGroup()
    #text = new RText()

    #style = new ROption()
    #event = new ROption()
    #attr = new ROption()

    current = null

    constructor(option = {}) {
        const {
            tag,
            style,
            event,
            attr,
            children,
            text
        } = option

        this.#tag = tag || this.#tag
        this.#text = text || this.#text
        this.#style = style || this.#style
        this.#event = event || this.#event
        this.#attr = attr || this.#attr
        this.#children = children || this.#children

        this.#style.onUpdate(() => this.#updateStyle())
        this.#event.onUpdate(() => this.#updateEvent())
        this.#attr.onUpdate(() => this.#updateAttr())
        this.#children.onUpdate(() => this.#updateChildren())
        this.#text.onUpdate(() => this.#updateText())

        this.#init()
    }

    #init() {
        this.current = document.createElement(this.#tag)
        this.#updateAttr()
        this.#updateEvent()
        this.#updateStyle()
        this.#updateChildren()
        this.#updateText()
    }

    #updateStyle() {
        this.#style.each(([name, value]) => {
            this.current.style[name] = value
        })
    }
    #updateEvent() {
        this.#event.each(([name, value]) => {
            this.current.addEventListener(name, value)
        })
    }
    #updateAttr() {
        this.#attr.each(([name, value]) => {
            this.current.setAttribute(name, value)
        })
    }
    #updateChildren() {
        if(this.#text.getText() !== null) return 

        this.#children.getList().forEach(v => {
            this.current.appendChild(v.current)
        })
    }
    #updateText() { 
        if(this.#text.getText() === null) return 
        
        this.current.innerText = this.#text.getText()
    }
}

export class RNodeCase extends RNodeGroup {
    #val = false 
}





