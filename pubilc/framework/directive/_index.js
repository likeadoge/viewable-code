import {loop} from './loop.js'
import {use} from './use.js'
import {case_break} from './case.js'

export class Directive {
    static list = []
    static use(name, options) {
        Directive.list.push(new Directive(name, options))
    }
    static renderElement(table, { data, render, next }) {
        return Directive.list.filter(v => table[v.name]).reduce(({ data, render, next }, v) => {
            if (v.onElementRender && typeof v.onElementRender === 'function')
                return v.onElementRender(table[v.name], { data, render, next }) || { data, render, next }
            else
                return { data, render, next }
        }, { data, render, next })
    }
    name = ''
    onElementRender = (options, { data, render, next }) => ({ data, render, next })
    constructor(
        name, options
    ) {
        this.name = name
        Object.assign(this, options)
    }
}

Directive.use(...loop)
Directive.use(...use)
Directive.use(...case_break)
