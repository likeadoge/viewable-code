import {abs_Value} from './base'

export class abs_Func extends abs_Value {
    apply() { }
}

// 本地函数
export class LocalFunc extends abs_Func {
    #fn = () => { }
    constructor(fn) {
        super()
        this.#fn = fn
    }

    apply(argus) {
        return this.#fn(...argus)
    }
}

export class Lambda extends abs_Func {

    #scope = null
    #argus = []
    #body = null

    static css = `
        .expr.lambda{
            border: 3px dashed #333;
            background:Plum;
        }
    `

    constructor(argus, body) {
        super()
        this.#argus = argus
        this.#body = body
    }


    render() {
        return `
        <div class="expr lambda">
            <div class="argus">
                ${this.#argus.map(v => `${v}`).join(' , ')}
            </div>

            <div class="body">
                ${this.#body.render()}
            </div>
        </div>
        `
    }

    eval(scope = Scope.globe) {
        if (!this.#scope) { this.#scope = new Scope(scope) }
        return this
    }

    apply(argus) {
        this.#argus.forEach((name, index) => {
            this.#scope.set(name, argus[index])
        })
        return this.#body.eval(this.#scope)
    }
}
