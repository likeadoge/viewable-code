import { zone } from './reactive.js'
import { RText, RNode, ROption } from './node.js'

const content = zone('out')
const color = zone('red')
const bg = zone('#ccc')
const text = new RText().setText(content)
const style = new ROption()
    .add('color', color)
    .add('background', bg)
    .add('textAlign','center')
const event = new ROption()
    .add('mousemove', () => { content.set('in')})
    .add('mouseleave', () => { content.set('out') })

const node = new RNode({
    tag: 'div', text, style,event
})

document.body.appendChild(node.current)

console.log(node)

window.content = content