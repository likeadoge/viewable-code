import { Program, types, call } from './lang/index.js'


const { Num } = types
const { Call } = call

const add = (a, b) => new Call(Num.add, [a, b])
const sub = (a, b) => new Call(Num.sub, [a, b])
const mul = (a, b) => new Call(Num.mul, [a, b])
const div = (a, b) => new Call(Num.div, [a, b])

const num = (n) => new Num(n)

const program = new Program(
    div(
        sub(
            mul(
                add(
                    num(1),
                    num(2)
                ),
                num(3)
            ),
            num(4)
        ),
        num(5)
    )
)


const button = document.createElement('button')

button.innerText = 'next'
button.onclick = () => program.next()

document.body.appendChild(button)

program.render()


