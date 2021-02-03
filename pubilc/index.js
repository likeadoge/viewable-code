import { Program, types } from './lang/index.js'


const {Num} = types

console.log(new Program(new Num(3)).render())


