const babel = require('babel-core');
const jsx = require('babel-plugin-transform-react-jsx');
const plugin = require('./index.js');

var example = `
    const foo = <div>lol</div>
`;

const {code} = babel.transform(example, {plugins: [jsx, plugin]});

console.info(code);