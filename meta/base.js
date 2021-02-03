import * as rand from '../utils/rand.js'

export class abs_Node {
    static nodes = new Map()
    static replace(oldone, newone) {
        const cntr = document.createElement('template')
        cntr.innerHTML = newone.render()
        const n_node = cntr.content.childNodes[0]
        const o_node = document.getElementById(oldone.eid)

        if (o_node) {
            o_node.after(n_node)
            o_node.remove()
        }
    }
    static css = `
        body{
            line-height:32px;
        }
        .expr{
            background:#66ccff;
            margin:4px;
        }
    `
    eid = ''
    kind = '(unknown)'

    constructor() {
        this.eid = `el-` + rand.uuid()
        Expr.nodes.set(this.eid, this)
    }
    render() {
        return `<div class="expr">(undone)</div>`
    }
}

export class abs_Value extends abs_Node{}

export class abs_Callable extends abs_Node{
    eval(scope = Scope.globe) {
        return this
    }

    next(scope = Scope.globe){

    }
}

