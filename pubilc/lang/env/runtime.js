import { ValFunc, ValNum, ValBool } from '../val/index.js'

export const runtime = new Map()

runtime.set('sys:lines', new ValFunc((...argus) => argus.reduce((a, b) => b, null)))


runtime.set('num:add', new ValFunc((a, b) => ValNum.add(a, b)))
runtime.set('num:sub', new ValFunc((a, b) => ValNum.sub(a, b)))
runtime.set('num:mul', new ValFunc((a, b) => ValNum.mul(a, b)))
runtime.set('num:div', new ValFunc((a, b) => ValNum.div(a, b)))

runtime.set('bool:not', new ValFunc((a, b) => ValBool.not(a, b)))
runtime.set('bool:or', new ValFunc((a, b) => ValBool.or(a, b)))
runtime.set('bool:and', new ValFunc((a, b) => ValBool.and(a, b)))
runtime.set('bool:cond', new ValFunc((a, b, c) => ValBool.cond(a, b, c)))