const babel = require('babel-core');
const jsx = require('babel-plugin-transform-react-jsx');
const plugin = require('./index.js');

var example = `const a = <label><button></button><tree></tree></label>`;

const {code} = babel.transform(example, {plugins: [jsx, plugin]});

console.info(code);