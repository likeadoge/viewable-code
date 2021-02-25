import { styl, StyleOption } from './style.js'
import { AttrOption, attr } from './attr.js'
import { get } from './base.js'

export class HtmlElementOpiton {
    tag = ``
    html = ``
    children = new HtmlElementGroup()
    style = new StyleOption()
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
                
                element.tag = name

                options.forEach(v => {
                    if (typeof v === 'string') element.html = v
                    if (v[get]) {
                        const s = v[get]

                        if (s instanceof StyleOption) element.style = s
                        if (s instanceof AttrOption) element.attr = s
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
        html.div()
            .span(`name`)
    )
    .div_body()

