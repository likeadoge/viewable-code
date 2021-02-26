import { styl, StyleOption } from './style.js'
import { AttrOption, attr } from './attr.js'
import { even, EventOption } from './event.js'
import { get } from './base.js'

export class HtmlElementOpiton {
    tag = ``
    html = ``
    type = ``
    children = new HtmlElementGroup()
    style = new StyleOption()
    attr = new AttrOption()
    event = new EventOption()
}

export class HtmlElementGroup {
    list = []
}

export const html = (el = new HtmlElementGroup) => new Proxy(el, {
    get: (group, name) =>
        name === get
            ? group
            : (...options) => {
                const element = new HtmlElementOpiton()

                const list = name.split('_')
                element.tag = list[0] || ''
                element.type = list[1] || ''

                options.forEach(v => {
                    if (typeof v === 'string') element.html = v
                    if (v[get]) {
                        const s = v[get]

                        if (s instanceof StyleOption) element.style = s
                        if (s instanceof AttrOption) element.attr = s
                        if (s instanceof EventOption) element.event = s
                        if (s instanceof HtmlElementGroup) element.children = s
                    }


                })
                group.list.push(element)

                return html(group)
            }
})


export const node = input => html()
    .div_header(
        styl.color('red')
            .background_color('yellow'),
        attr.title('this is head!')
            .class('name'),
        even.click(() => alert(`click!`)),
        html.div()
            .span(`name`),
    )
    .div_body()

