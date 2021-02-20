import { List } from './base.js'

export class Call extends List {
    toJsonObj() {
        return {
            type: 'call',
            list: this.getList().map(v => v.toJsonObj())
        }
    }

    val() {
        const [fn, ...argus] = this.getList()
        const valfn = fn.val()

        return valfn.apply(argus.map(v => v.val()))
    }

    clone() {
        return new Call().setList(this.getList().map(v=>v.clone()))
    }
}