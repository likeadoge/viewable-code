import { ReactZone, Watcher } from './reactive.js'


export class Reactable {
    emiter = new Watcher(() => this.update())
    // 更新接口
    update() { }
}


export class ROption extends Reactable {
    #map = new Map
    each(cb) {
        for (const [name, value] of this.#map.entries()) {
            cb(name, value)
        }
    }
    add(name, val) {
        if (val instanceof ReactZone) {
            // 添加监听，修改的时候进行更新
            val.addWatcher(this.emiter)
            this.map.add(name, val.val())
        } else {
            this.map.add(name, val)
        }
        return this
    }
    // 更新操作 
    update() {
        // todo
    }
}


export class RNode {
    style = new ROption()
    event = new ROption()
    attr = new ROption()
    children = new RNodeGroup()
    tag = 'div'

    html = ''

    #updateStyle() { }
    #updateEvent() { }
    #updateAttr() { }
    #updateChildren() { }
    #updateHtml() { }
}

export class RNodeGroup {
    #list = []
    getList() {
        return this.#list.map(
            v => v instanceof RNodeGroup ? v.getList()
                : v instanceof RNode ? v
                    : new Error('should be rNode!'))
    }

    setList(list) {
        this.#list = list
    }
}


export class RNodeCase {

}

export class NN





