## 前言

起因是guy在让我们学习[preact](https://preactjs.com/)给我们布置的一个作业，目的是让我们学习[preact](https://preactjs.com/)的`h`函数后，复写`h`函数，实现fineUI那一套语法，其实也并不是很难。

那天晚上我问guy到底是要重写`h`函数还是写babel插件，他说都行。

于是我走了另一条路。准备直接写个babel插件把jsx直接转译成fineUI语法。

## 准备

[babel开发者手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)是必不可少的学习资料。

## AST语法树

如果我要求出字符串`1 + 1`的值`2`，有什么解决办法？

——将这个字符串通过正则搭成一棵树，再通过遍历树节点实现最后的功能。

同样，需要转译的代码对于[Node.js](https://nodejs.org/en/)来说就是一推字符串，我们需要将其转换成一棵树再进行操作。

还好，这件事babel已经帮我做了，这就是AST抽象语法树。

比如下一段代码：

```javascript
function square(n) {
  return n * n;
}
```

其语法树：

```javascript
- FunctionDeclaration:
  - id:
    - Identifier:
      - name: square
  - params [1]
    - Identifier
      - name: n
  - body:
    - BlockStatement
      - body [1]
        - ReturnStatement
          - argument
            - BinaryExpression
              - operator: *
              - left
                - Identifier
                  - name: n
              - right
                - Identifier
                  - name: n
```

更好地了解语法树，可以访问这个[网站](http://astexplorer.net/)（国内访问很慢）。

## Visitors（访问者）

> 当我们谈及“进入”一个节点，实际上是说我们在**访问**它们， 之所以使用这样的术语是因为有一个[**访问者模式（visitor）**](https://en.wikipedia.org/wiki/Visitor_pattern)的概念。

在进入AST树后，每个节点实际上会被访问两次，向下进入节点，向上退出节点。

以`Identifier`为例：

```javascript
const MyVisitor = {
  Identifier() {
    console.log("Called!");
  }
};

// 实际上等于下面
const MyVisitor = {
  Identifier: {
    enter() {
      console.log("Called!");
    }
  }
};
```

假设我们有一个树状结构：

```
- FunctionDeclaration
  - Identifier (id)
  - Identifier (params[0])
  - BlockStatement (body)
    - ReturnStatement (body)
      - BinaryExpression (argument)
        - Identifier (left)
        - Identifier (right)
```

当我们向下遍历这颗树的每一个分支时我们最终会走到尽头，于是我们需要往上遍历回去从而获取到下一个节点。 向下遍历这棵树我们**进入**每个节点，向上遍历回去时我们**退出**每个节点。

让我们以上面那棵树为例子走一遍这个过程。

- 进入 `FunctionDeclaration`
  - 进入 `Identifier (id)`
  - 走到尽头
  - 退出 `Identifier (id)`
  - 进入 `Identifier (params[0])`
  - 走到尽头
  - 退出 `Identifier (params[0])`
  - 进入 `BlockStatement (body)`
  - 进入 `ReturnStatement (body)`
    - 进入 `BinaryExpression (argument)`
    - 进入 `Identifier (left)`
      - 走到尽头
    - 退出 `Identifier (left)`
    - 进入 `Identifier (right)`
      - 走到尽头
    - 退出 `Identifier (right)`
    - 退出 `BinaryExpression (argument)`
  - 退出 `ReturnStatement (body)`
  - 退出 `BlockStatement (body)`
- 退出 `FunctionDeclaration`

所以当创建访问者时你实际上有两次机会来访问一个节点

## 实践

[babel-types的AP文档](https://github.com/babel/babel/tree/master/packages/babel-types)，大部分需要的API在这里都可以找到。

首先，根据AST树结构。通过`babel-plugin-transform-react-jsx`转译的jsx语法会变成以下结构：

```javascript
React.createElement(tag, attritubtes, child);
```

通过学习AST树可知`React.createElement`整个方法是在`CallExpression`节点被创建和访问的。

要想替换成[FineUI](https://github.com/fanruan/fineui)中结构，其实只要替换`CallExpression`节点。

## 学习资料

- [babel转换jsx源码](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-react-jsx/src/index.js)
- [关于jsx](https://jasonformat.com/wtf-is-jsx/)
- [babel开发者手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [babel-types的AP文档](https://github.com/babel/babel/tree/master/packages/babel-types)
- [可视化AST树](http://astexplorer.net/)


## 项目地址

[Github项目地址](https://github.com/iapYang/fanruan-babel-translater)