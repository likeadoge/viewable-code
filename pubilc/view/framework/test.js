import { html, attr, styl, get } from './option/index.js'
import { render } from './render.js'

const op = html()
    .div(
        styl().color('red')
            .background_color('yellow'),
        attr().title('this is head!')
            .class('name'),
        html().div()
            .span(
                styl().color('green')
                    .font_size('18px'),
                `name`)
    )
    .div()
[get]

console.log(styl().color('green'))
console.log(op)
const dom = render(op)

document.body.appendChild(dom)

