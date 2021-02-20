import { Value, Call } from '../ast/value.js'

export class Program {
    source = null
    #current = null
    constructor(input) {
        const { source } = input
        this.source = source.clone()
        this.#current = source.clone()
    }

    #eval(call) {
        const fn = call.fn()
        const argus = call.argus()
        return fn.apply(argus)
    }

    nextStep() {
        const recur = (node) => {
            if (node instanceof Value) {
                return [node.clone(), false]
            } else if (node instanceof Call) {
                const fn = node.fn()
                const argus = node.argus()

                const [newargus, status] = argus.reduce((res, v) => {
                    const [arr, status] = res
                    if (status) {
                        return [arr.concat([v]), true]
                    }else {
                        const [n, s] = recur(v)
                        return [arr.concat([n]), s]
                    }
                }, [[], false])

                if (status) {
                    const n = node.clone().setChildren([fn, ...newargus])
                    return [n, true]
                } else {
                    const n = node.clone().setChildren([fn, ...newargus])
                    return [this.#eval(n), true]
                }
            }
        }

        const [n] = recur(this.#current)

        this.#current = n

        return this
    }
}