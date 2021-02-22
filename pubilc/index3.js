import { ast, Program } from './lang3/index.js'

const { SymCall: SymCall, SymNum, SymLocalFunc } = ast

const test = [
    () => {

        const call = new SymCall()
            .setComment('this is call')
            .setList([
                SymLocalFunc.gen('num:add').setComment('this is function'),
                SymNum.gen(2).setComment('this is argument0'),
                SymNum.gen(3).setComment('this is argument1'),
            ])
            .clone()

        console.log(call)

    },
    () => {

        const call = new SymCall()
            .setComment('this is call')
            .setList([
                SymLocalFunc.gen('num:add').setComment('this is function'),
                SymNum.gen(2).setComment('this is argument0'),
                SymNum.gen(3).setComment('this is argument1'),
            ])
            .clone()
            .val()

        console.log(call)

    },
    () => {
        const source = new SymCall()
            .setComment('this is call')
            .setList([
                SymLocalFunc.gen('num:add').setComment('this is function'),
                SymNum.gen(2).setComment('this is argument0'), 
                new SymCall()
                    .setComment('this is call')
                    .setList([
                        SymLocalFunc.gen('num:add').setComment('this is function'),
                        SymNum.gen(2).setComment('this is argument0'),
                        SymNum.gen(3).setComment('this is argument1'),
                    ])
            ])

        const program = new Program({ source })
        console.log(program)
        window.next = () => console.log(program.nextStep())
    }
]


test.forEach(v => v())