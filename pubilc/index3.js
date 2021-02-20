import { ast } from './lang3/index.js'

const { Call, SymNum ,SymLocalFunc} = ast

const test = [
    () => {

        const call = new Call()
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

        const call = new Call()
            .setComment('this is call')
            .setList([
                SymLocalFunc.gen('num:add').setComment('this is function'),
                SymNum.gen(2).setComment('this is argument0'),
                SymNum.gen(3).setComment('this is argument1'),
            ])
            .clone()
            .val()

        console.log(call)

    }
]


test.forEach(v => v())