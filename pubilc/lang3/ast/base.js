import { throw_abs_error } from '../../utils/error.js'
import { Value } from '../val/index.js'

export class Node {
    #comment = ''

    setComment(s) {
        this.#comment = s
        return this
    }

    getComment() {
        return this.#comment
    }

    toJsonObj() { throw_abs_error(`Node:toJsonObj`) }


    val() { throw_abs_error(`Sym:val`) }

    clone() { throw_abs_error(`Node:clone`) }
}

export class Sym extends Node {
    set() { throw_abs_error(`Sym:set`) }
    get() { throw_abs_error(`Sym:get`) }

}

export class List extends Node {
    #list = []

    setList(list) { this.#list = list; return this }
    getList() { return this.#list }
}

export class SymValue extends Sym {

}


export class SymCall extends List {
    toJsonObj() {
        return {
            type: 'call',
            list: this.getList().map(v => v.toJsonObj())
        }
    }

    val() {
        const [fn, ...argus] = this.getList()
        const valfn = fn instanceof Value ? fn : fn.val()

        return valfn.apply(argus.map(v => v instanceof Value ? v : v.val()))
    }

    getFn() {
        const [fn, ...argus] = this.getList();
        return fn
    }

    setFn(fn) {
        const [fn0, ...argus] = this.getList();
        this.setList([fn, ...argus])
        return this
    }

    setArgus(argus) {
        const [fn, ...argus0] = this.getList();
        this.setList([fn, ...argus])
        return this
    }

    getArgus() {
        const [fn, ...argus0] = this.getList()
        return argus0
    }

    clone() {
        return new SymCall().setList(this.getList().map(v => v instanceof Node ? v.clone() : v))
    }
}



