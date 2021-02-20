import { throw_abs_error } from '../../utils/error.js'

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



