// 向下遍历访问节点，向上遍历退出节点
module.exports = function testPlugin({ types: t }) {
    return {
        visitor: {
            /* CallExpression(path) {
                const node = path.node;
                const callee = node.callee;
                const arguments = node.arguments;

                if (t.isMemberExpression(callee)
                    && t.isIdentifier(callee.object, {
                        name: 'React'
                    }) && t.isIdentifier(callee.property, {
                        name: 'createElement'
                    })) {
                    const objectProperties = [];

                    arguments.forEach((argument, index) => {
                        if (t.isLiteral(argument)) {
                            if (index) {
                                objectProperties.push(t.objectProperty(
                                    t.identifier('text'),
                                    t.stringLiteral(argument.value)
                                ));
                            } else {
                                objectProperties.push(t.objectProperty(
                                    t.identifier('type'),
                                    t.stringLiteral(`bi.${argument.value}`)
                                ));
                            }
                        } else if (t.isObjectExpression(argument)) {
                            argument.properties.forEach(property => {
                                objectProperties.push(t.objectProperty(
                                    t.identifier(property.key.name),
                                    t.stringLiteral(property.value.value)
                                ));
                            })
                        }
                    });

                    path.replaceWith(t.callExpression(
                        t.memberExpression(
                            t.identifier('BI'),
                            t.identifier('createWidget')
                        ), [
                            t.objectExpression(objectProperties)
                        ])
                    );
                }
            }, */
        },
    }
}