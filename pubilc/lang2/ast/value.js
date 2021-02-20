import { AbsBranch, AbsLeaf, AbsNode } from './node.js'

export class Call extends AbsBranch {
    static kind = 'call'

    static gen(fn, argus) {
        return new this().setChildren(
            [fn, ...argus]
        )
    }

    fn(){
        const [fn,...argus] = this.getChildren()
        return fn
    }
    argus(){
        const [fn,...argus] = this.getChildren()
        return argus
    }
    
    static fromJsonObj(obj) {
        const call = super.fromJsonObj(obj)
        call.setChildren(obj.children.map(v => AbsNode.prase(v)))
        return call
    }


    toJsonObj() {
        return {
            ...super.toJsonObj(),
            children: this.getChildren().map(v => v.toJsonObj())
        }
    }

}

export class Value extends AbsLeaf {
    static kind = 'value'

    static gen() {
        return new Value()
    }

    static fromJsonObj(obj) {
        return super.fromJsonObj(obj)
    }

    toJsonObj() {
        return super.toJsonObj()
    }
}

AbsNode.regist(Value)

AbsNode.regist(Call)