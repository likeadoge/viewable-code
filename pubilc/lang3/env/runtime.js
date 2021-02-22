import { ValFunc, ValNum } from '../val/index.js'

export const runtime = new Map()

runtime.set('sys:lines', new ValFunc((...argus) => argus.reduce((a, b) => b, null)))


runtime.set('num:add', new ValFunc((a, b) => ValNum.add(a, b)))
runtime.set('num:sub', new ValFunc((a, b) => ValNum.sub(a, b)))
runtime.set('num:mul', new ValFunc((a, b) => ValNum.mul(a, b)))
runtime.set('num:div', new ValFunc((a, b) => ValNum.div(a, b)))