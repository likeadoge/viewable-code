import { DgTmpl } from '../node/_index.js'

export class DgComponent {
    static builder() {
        return new DgBuilder()
    }

    tmpl = null
    namespaces = () => (new Map())
    props = () => (new Map())
    events = () => (new Map())
    methods = () => (new Map())

    constructor({  tmpl, namespaces, events, methods, props }) {
        Object.assign(this, {
             tmpl, namespaces, events, methods, props
        })
    }

    gen() {
        console.log(this)
        const events = this.events()
        const methods = this.methods()
        const props = this.props()
        const data = Array.from(this.namespaces().entries())
            .reduce((map, [name, data]) => {
                map[name] = data
                return map
            }, {})

        console.log(data)
        const node = this.tmpl.render(data)

        const instance = new DgInstance({
            node, data, events, methods, props
        })

        return instance
    }

}

export class DgInstance {
    node = null
    data = new Map()
    events = new Map()
    methods = new Map()


    constructor({node, data, events, methods, props }) {
        Object.assign(this, {
             node, data, events, methods, props
        })
    }

}

export class DgBuilder {

    #components = new Map()
    #events = new Map()
    #methods = new Map()
    #props = new Map()
    #namespaces = new Map()
    #templateStr = ''

    namespace(name, setup) {
        this.#namespaces.set(name, setup)
        return this
    }
    use(components) {
        Object.entries(components).map(([name, component]) => {
            this.#components.set(name, component)
        })
        return this
    }
    events(events) {
        Object.entries(events).map(([name, event]) => {
            this.#events.set(name, event)
        })
        return this
    }
    methods(methods) {
        Object.entries(methods).map(([name, method]) => {
            this.#methods.set(name, method)
        })
        return this
    }
    template(str) {
        this.#templateStr = str
        return this
    }
    props(props) {
        Object.entries(props).map(([name, prop]) => {
            this.#props.set(name, prop)
        })
        return this
    }
    build() {

        const tmpl = new DgTmpl(
            this.#templateStr,
            Array.from(this.#namespaces.keys())
        )
        const events = () => this.#events
        const methods = () => this.#methods
        const props = () => this.#props
        const namespaces = (...argus) =>{
            const n = Array.from(this.#namespaces.entries())
                .reduce((map, [name, fn]) => {
                    map.set(name, fn(...argus))
                    return map
                }, new Map())
            n.set('_component',this.#components)
                
            return n
        }



        return new DgComponent({
            tmpl, events, methods, props, namespaces
        })
    }

}

export class DgContainer {

    target = null
    instance = null

    constructor(target) {
        this.target = target
    }

    inject(component) {
        this.instance = component.gen()
        this.instance.node.mount(this.target)
    }
}