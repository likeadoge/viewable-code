import { SymCall, SymValue } from '../ast/base.js'
import { Value } from '../val/index.js'

export class Program {
    #source = null
    #current = null

    constructor({ source }) {
        this.#source = source.clone()
        this.#current = source.clone()
    }

    nextStep() {
        const recur = (node) => {
            if (node instanceof Value) {
                return [node, false]
            } else if (node instanceof SymValue) {
                return [node.val(), true]
            } else if (node instanceof SymCall) {
                const argus = node.getArgus()

                const [newargus, status] = argus.reduce((res, v) => {
                    const [arr, status] = res
                    if (status) {
                        return [arr.concat([v]), true]
                    } else {
                        const [n, s] = recur(v)
                        return [arr.concat([n]), s]
                    }
                }, [[], false])

                if (status) {
                    const n = node.clone().setArgus(newargus)
                    return [n, true]
                } else {
                    const n = node.clone().setArgus(newargus)
                    return [n.val(), true]
                }
            } else {
                console.error(node)
                throw new Error('recur type error')
            }
        }

        const [n] = recur(this.#current)

        this.#current = n

        return this
    }

    source() {
        return this.#source
    }
}