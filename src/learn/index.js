// 向下遍历访问节点，向上遍历退出节点
module.exports = function testPlugin({ types: t }) {
    return {
        visitor: {
            FunctionDeclaration(path) {
                console.log("Visiting FunctionDeclaration: " + path.node.name);
            },
        
            Identifier(path) {
                if (t.isIdentifier(path.node, { name: "React" })) {
                    path.node.name = "BI";
                }
        
                console.log("Visiting Identifier: " + path.node.name);
        
                for (key in path.params) {
                    console.log(key, path.parent[key]);
                }
        
                console.log('=======================');
            },

            MemberExpression(path) {
                console.log(`Visiting MemberExpression ${path.node}`);
            },
        
            BinaryExpression(path) {
                console.log("Visiting BinaryExpression: " + path.node.name);
            }
        },
    }
}