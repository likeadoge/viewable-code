import { get } from './base.js'
import { ReactZone, Emitter } from '../reactive/index.js'


const { xdom, event, list } = {}


export class ElementOpiton {
    tag = ``
    type = ``
    html = ``
    style = new StyleOption()
    attr = new AttrOption()
    event = new EventOption()
    current = null
}

export class DomStructGroup {
    list = []
}

export class DomStruct {}

export class DomNode {
    elememt = null
    group = null
}

export class DomCase extends DomStruct {
    case = null
    elememt = null
    group = null
}

export class DomLoop extends DomStruct {
    list = []
    gen = () => null
    groups = []
}


export const vnode = (el = new HtmlElementGroup) => new Proxy(el, {
    get: (group, name) =>
        name === get
            ? group
            : (...options) => {
                const element = new ElementOpiton()
                const group = new DomStructGroup()

                const list = name.split('_')
                element.tag = list[0] || ''
                element.type = list[1] || ''

                options.forEach(v => {
                    if (typeof v === 'string') 
                        element.html = v
                    if (v[get]) {
                        const s = v[get]

                        if (s instanceof StyleOption) element.style = s
                        if (s instanceof AttrOption) element.attr = s
                        if (s instanceof EventOption) element.event = s
                        if (s instanceof DomStructGroup) element.children = s
                    }
                })
                group.list.push(element)

                return vnode(group)
            }
})





useWidght('main_app', ant)
    .ant_header(
        event()
            .click(() => console.log(`click`))
            .mouse_over(() => console.log('over')),
        style()
            .background('red'),
        udom({ as: 'logo' })
            .ant_logo('./asset/logo.svg'),
        uloop(list, (val, i) => xdom()
            .ant_btn(
                val.title,
                event().click
            ))
    )
    .ant_body()


