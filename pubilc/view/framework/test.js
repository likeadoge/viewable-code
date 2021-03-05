import { html, attr, styl, even, get } from './option/index.js'
import { render } from './render.js'

const op = html()
    .div(
        styl()
            .color('red')
            .background_color('yellow'),
        attr()
            .title('this is head!')
            .class('name'),
        even()
            .mouse_enter((dom) => { dom.style.backgroundColor = '#66ccff' })
            .mouse_leave((dom) => { dom.style.backgroundColor = 'yellow' }),
        html()
            .div()
            .span(
                styl().color('green')
                    .font_size('18px'),
                `header`)
    )
    .div()
[get]

console.log(styl().color('green'))
console.log(op)
const dom = render(op)

document.body.appendChild(dom)

