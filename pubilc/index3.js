import { ast, Program } from './lang3/index.js'

const { SymCall: SymCall, SymNum, SymLocalFunc, SymDefine, SymRefer } = ast

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
        window.next0 = () => console.log(program.nextStep())
    },
    () => {
        const source = new SymCall()
            .setFn(SymLocalFunc.gen('sys:lines'))
            .setArgus([
                new SymCall()
                    .setFn(SymDefine.gen('foo'))
                    .setArgus([
                        new SymCall()
                            .setFn(
                                SymLocalFunc.gen('num:add').setComment('this is function'))
                            .setArgus([
                                SymNum.gen(2).setComment('this is argument0'),
                                SymNum.gen(3).setComment('this is argument1')
                            ])
                    ]),

                new SymCall()
                    .setFn(SymLocalFunc.gen('num:mul'))
                    .setArgus([
                        SymRefer.gen('foo'),
                        new SymCall()
                            .setFn(
                                SymLocalFunc.gen('num:add').setComment('this is function'))
                            .setArgus([
                                SymNum.gen(2).setComment('this is argument0'),
                                SymNum.gen(3).setComment('this is argument1')
                            ])
                    ]),
            ])

        const program = new Program({ source })
        console.log(program)
        window.next1 = () => console.log(program.nextStep())
    }
]


test.forEach(v => v())