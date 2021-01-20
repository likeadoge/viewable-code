import { Ast } from './Ast.js'



export class DgTmpl{
    ast = null
    constructor(str,scope){
        this.ast = Ast.gen(str,scope)
    }

    render(data){
        const tmpl = this
        const viewNode = this.ast.render(null,data)[0]
        return new DgNode({tmpl,viewNode})
    }
}

export class DgNode{
    tmpl = null
    viewNode = null
    container = null
    current = null
    tag = 'div'

    constructor(json){
        Object.assign(this,json)
        this.current = document.createElement(this.tag)
    }


    mount(container = null){
        this.container = container || this.container

        if(!this.container) throw new Error("DNode mount error : can't mount without container!")
    
        this.viewNode.mount(this.current)

        this.container.appendChild(this.current)
    }
}



// Token.scan(document.getElementById('tpl').innerHTML).flatMap(v =>
//     [
//         [TokenSubHeadNode, '#FFC0CB'],
//         [TokenHeadNode, '#FFA500'],
//         [TokenTailNode, '#FFE211'],
//         [TokenTextNode, '#66ccff'],
//         [TokenHtmlNode, '#39C5BB'],
//     ].map(([Cls, color]) => {
//         if (v.__proto__.constructor === Cls) {
//             const span = document.createElement('span')
//             span.innerText = v.content.split(' ').join('-')
//             span.style.background = color
//             return span
//         } else {
//             return null
//         }
//     })
// ).filter(v => !!v).forEach(span => {
//     document.getElementById('lexer').appendChild(span)
// })


// console.log('Parser', Parser.gen(
//     document.getElementById('tpl').innerHTML
// ))

// console.log('AST', window.ast = Ast.gen(
//     document.getElementById('tpl').innerHTML,
//     ["times", "list"]
// ))

// const data = {
//     times: 3,
//     list: [{
//         type: 'text',
//         text: 'test'
//     }, {
//         type: 'input',
//         value: 'test'
//     }, {

//     }]
// }

// console.log('Vnode', window.node = Ast.gen(
//     document.getElementById('tpl').innerHTML,
//     ["times", "list"]
// ).render(null, data))


// window.node[0].mount(document.querySelector('#app'))