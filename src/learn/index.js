// 向下遍历访问节点，向上遍历退出节点
module.exports = function testPlugin({ types: t }) {
    return {
        visitor: {
            Identifier(path) {},

            CallExpression(path) {
                const node = path.node;
                
                path.replaceWith(t.memberExpression(
                    t.identifier('BI'),
                    t.identifier('createWidget')
                ), [t.objectExpression([
                    t.objectProperty(t.identifier('type'), t.stringLiteral('bi.label'))
                ])]);
            },

            MemberExpression(path) {
                const node = path.node;

                if (t.isIdentifier(node.object, {
                    name: 'React'
                }) && t.isIdentifier(node.property, {
                    name: 'createElement'
                })) {
                    path.replaceWith(
                        t.memberExpression(
                            t.identifier('BI'),
                            t.identifier('createWidget')
                        )
                    );
                }
            },
        },
    }
}