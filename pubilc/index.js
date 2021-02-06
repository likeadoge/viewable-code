import { Program, types, expr } from './lang/index.js'


const { Num, Bool, Lambda } = types
const { Call, Ref } = expr

const add = (a, b) => new Call(Num.add, [a, b])
const sub = (a, b) => new Call(Num.sub, [a, b])
const mul = (a, b) => new Call(Num.mul, [a, b])
const div = (a, b) => new Call(Num.div, [a, b])

const and = (a, b) => new Call(Bool.and, [a, b])
const or = (a, b) => new Call(Bool.or, [a, b])
const not = (a) => new Call(Bool.not, [a])
const cond = (a, b, c) => new Call(Bool.cond, [a, b, c])

const num = (n) => new Num(n)
const _f = () => new Bool(false)
const _t = () => new Bool(true)
const ref = (name) => new Ref(name)

const lambda = (...argus) => body => new Lambda(argus, body)
const apply = (fn) => (...argus) => new Call(fn, argus)

const program = new Program(

    cond(and(_f(), or(_t(), _f())),


        add(num(1), num(3)),
        sub(
            apply(
                lambda('a', 'b')(mul(ref('a'), num(3)))
            )(add(num(8),num(2)), num(2)),
            num(2)
        )
    )
)


const button = document.createElement('button')

button.innerText = 'next'
button.onclick = () => program.next()

document.body.appendChild(button)

program.render()


