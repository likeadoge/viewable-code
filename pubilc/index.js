import { Program, types, call } from './lang/index.js'


const { Num, Bool } = types
const { Call } = call

const add = (a, b) => new Call(Num.add, [a, b])
const sub = (a, b) => new Call(Num.sub, [a, b])
const mul = (a, b) => new Call(Num.mul, [a, b])
const div = (a, b) => new Call(Num.div, [a, b])

const and = (a, b) => new Call(Bool.and, [a, b])
const or = (a, b) => new Call(Bool.or, [a, b])
const not = (a) => new Call(Bool.not, [a])
const cond = (a, b, c) => new Call(Bool.cond, [a, b, c])

const num = (n) => new Num(n)
const _f = ()=> new Bool(false)
const _t = ()=> new Bool(true)

const program = new Program(

    cond(and(_f(),or(_t(),_f())),
        add(num(1),num(3)),
        sub(num(1),num(3)),
    )
    // div(
    //     sub(
    //         mul(
    //             add(
    //                 num(1),
    //                 div(
    //                     sub(
    //                         mul(
    //                             add(
    //                                 num(1),
    //                                 num(2)
    //                             ),
    //                             num(3)
    //                         ),
    //                         num(4)
    //                     ),
    //                     num(5)
    //                 )
    //             ),
    //             num(3)
    //         ),
    //         num(4)
    //     ),
    //     num(5)
    // )
)


const button = document.createElement('button')

button.innerText = 'next'
button.onclick = () => program.next()

document.body.appendChild(button)

program.render()


