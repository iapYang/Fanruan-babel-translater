## 前言

起因是guy在让我们学习[preact](https://preactjs.com/)给我们布置的一个作业，目的是让我们学习[preact](https://preactjs.com/)的`h`函数后，复写`h`函数，实现fineUI那一套语法，其实也并不是很难。

那天晚上我问guy到底是要重写`h`函数还是写babel插件，他说都行。

于是我走了另一条路。准备直接写个babel插件把jsx直接转译成fineUI语法算了。

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

（….未完，明天写Visitors）

## 学习资料

- [babel转换jsx源码](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-react-jsx/src/index.js)
- [关于jsx](https://jasonformat.com/wtf-is-jsx/)
- [babel开发者手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [babel-types的AP文档I](https://github.com/babel/babel/tree/master/packages/babel-types)
- [可视化AST树](http://astexplorer.net/)


## 项目地址

[Github项目地址](https://github.com/iapYang/fanruan-babel-translater)