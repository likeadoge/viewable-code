

export class AstNode {
    kind = '(unknown)'
    extra = {}
    isLeaf = true


    static css = {
        'body': {
            lineHeight: "32px"
        },
        '.expr': {
            background: '#66ccff',
            margin: '4px'
        }
    }

    static assert(m){
        if(! m instanceof this) {
            console.error('it should be',this)
            throw new Error('AstNode type Error!')
        }
    }


    clone(){
        return new AstNode()
    }
}

export class AstLeafNode extends AstNode {
    isLeaf = true
    clone(){
        return new AstLeafNode()
    }
}

export class AstBranchNode extends AstNode {
    isLeaf = false
    children = []
    
    clone(){
        return new AstBranchNode()
    }
}