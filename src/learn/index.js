// 向下遍历访问节点，向上遍历退出节点
const MyVisitor = {
    Identifier: {
        enter() {
            console.log("Entered!");
        },
        exit() {
            console.log("Exited!");
        }
    }
};

module.exports = function testPlugin(babel) {
    return {
        visitor: MyVisitor,
    }
}