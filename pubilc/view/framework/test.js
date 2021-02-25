import { html, attr, styl, get } from './option/index.js'

console.log(
    html()
        .div(
            styl().color('red')
                .background_color('yellow'),
            attr().title('this is head!')
                .class('name'),
            html().div()
                .span(`name`)
        )
        .div()
    [get]
)