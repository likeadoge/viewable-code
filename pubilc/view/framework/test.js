import { html, attr, styl, even, get } from './option/index.js'
import { render } from './render.js'
import { rZone } from './reactive/index.js'

const vm = rZone({ title: 'this is head', count: 2 })

window.vm = vm

const title = vm.map(({ title, count }) => title + (new Array(count).fill('!').join('')))

const op = html()
    .div(
        styl()
            .color('red')
            .background_color('yellow'),
        attr()
            .title(title)
            .class('name'),
        even()
            .mouse_enter((dom) => { dom.style.backgroundColor = '#66ccff' })
            .mouse_leave((dom) => { dom.style.backgroundColor = 'yellow' })
            .click(() => vm.modify(({ title, count }) => {
                debugger
                return {
                    title: (count % 2 === 0) ? title.toLocaleLowerCase() : title.toLocaleUpperCase(),
                    count: count + 1
                }
            }))
        ,
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

