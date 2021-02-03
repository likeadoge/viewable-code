export class AstNode{
    kind = '(unknown)'
    extra = {}
    isLeaf = true
}

export class AstLeafNode{
    isLeaf = true
}

export class AstBranchNode{
    isLeaf = false
    children = []
}