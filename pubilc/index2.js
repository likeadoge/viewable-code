import { Call, Value, Num } from './lang2/index.js'
import { Program } from './lang2/env/Program.js'

const test = [
    () => {

        const call = new Call()
            .setComment('this is call')
            .setChildren([
                Value.gen().setComment('this is function'),
                Value.gen().setComment('this is argument0'),
                Value.gen().setComment('this is argument1'),
            ])
            .clone()

        console.log(call)

    },
    () => {

        const call = new Call()
            .setComment('this is call')
            .setChildren([
                Num.fn.add,
                Num.gen(1).setComment('this is argument0'),
                Num.gen(2).setComment('this is argument1'),
            ])
            .clone()

        console.log(call)

    },
    ()=>{
        const source = new Call()
        .setComment('this is call')
        .setChildren([
            Num.fn.add,
            Num.gen(1).setComment('this is argument0'),
            new Call()
            .setComment('this is call')
            .setChildren([
                Num.fn.add,
                Num.gen(1).setComment('this is argument0'),
                Num.gen(2).setComment('this is argument1'),
            ])
        ])

        const program = new Program({source})
        console.log(program)
        window.next = ()=>console.log(program.nextStep())
    }
]


test.forEach(v => v())