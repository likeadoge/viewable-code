import {
    AttrOption, StyleOption,EventOption, HtmlElementGroup, HtmlElementOpiton
} from './option/index.js'

export const render = (group, cntr = document.createElement('div')) => {
    if (group instanceof HtmlElementGroup) {
        group.list.forEach(v => {
            if (v instanceof HtmlElementOpiton) {
                const { style, event, children, attr, tag, html } = v

                const dom = document.createElement(tag)

                if (style instanceof StyleOption) {
                    style.apply(dom)
                } else
                    throw new Error('style render error!')

                    
                if (event instanceof EventOption) {
                    event.apply(dom)
                } else
                    throw new Error('event render error!')


                if (attr instanceof AttrOption) {
                    attr.apply(dom)
                } else
                    throw new Error('attr render error!')


                if (event instanceof EventOption) {
                    style.apply(dom)
                } else
                    throw new Error('style render error!')

                if (html && typeof html === 'string') {
                    dom.innerHTML = html
                } 

                render(children, dom)

                cntr.appendChild(dom)

            } else
                throw new Error('html render error!')
        })

    } else
        throw new Error('group render error!')

    return cntr
}