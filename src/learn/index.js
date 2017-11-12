// 向下遍历访问节点，向上遍历退出节点
module.exports = function testPlugin({ types: t }) {
    return {
        visitor: {
            Identifier(path) {},

            CallExpression(path) {
                const node = path.node;
                
                
            },

            Literal(path) {
                let node = path.node;

                path.insertBefore(t.objectExpression([t.objectProperty(t.identifier('type'), t.identifier('key'))]));
            },

            MemberExpression(path) {
                for (key in path.node) {
                    let value = path.node[key];

                    if (t.isIdentifier(value, {
                        name: 'React'
                    })) {
                        value.name = 'BI';
                    } else if (t.isIdentifier(value, {
                        name: 'createElement'
                    })) {
                        value.name = 'createWidget';
                    }
                }
            },
        },
    }
}