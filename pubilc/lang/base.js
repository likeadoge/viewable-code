export class AstNode {
    kind = '(unknown)'
    extra = {}
    isLeaf = true

    static render(a) {
        const { render } = Object.getPrototypeOf(a).constructor
        if (!render) throw new Error(`can't find render method!`)
        return render(a)
    }

    static css = {
        'body': {
            lineHeight: "32px"
        },
        '.expr': {
            background: '#66ccff',
            margin: '4px'
        }
    }
}

export class AstLeafNode {
    isLeaf = true
}

export class AstBranchNode {
    isLeaf = false
    children = []

    static run(node) {
        const { run } = Object.getPrototypeOf(node).constructor
        if (!run) throw new Error(`can't find run method!`)
        return run(node)
    }
}