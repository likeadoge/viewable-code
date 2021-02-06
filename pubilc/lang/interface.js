import { Scope } from './Scope.js'

export const EvalAble = {
    key: Symbol('_eval_')
}

export const WithContext = {
    key: Symbol('_context_'),
    def: () => ({
        _scope_: Scope.globe,
        init(fa) { this._scope_ = new Scope(fa) },
        getScope() { return this._scope_ }
    })
}