import { Num } from './type/index.js'



const css = [Num]
    .map(v => v.css)
    .flatMap(v => Object.entries(v))
    .map(([sel, values]) => `
        ${sel}{
            ${Object.entries(values)
            .map(([key, value]) => `${key}:${value};`)
            .join('\n')}
        }
    `)
    .join(``)
const style = document.createElement('style')
style.innerHTML = css
document.body.appendChild(style)

export default class Program {


    #el = null

    #main = null

    constructor(main) {
        this.#main = main
        this.#el = document.getElementById('app') || document.createElement('div')
        this.#el.id = 'app'
        document.body.appendChild(this.#el)
    }

    render() {
        let html = ``

        if (this.#main instanceof Num) html = Num.render(this.#main)
        else throw new Error('Render Error !')

        this.#el.innerHTML = html
    }

}