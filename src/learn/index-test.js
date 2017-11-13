const babel = require('babel-core');
const jsx = require('babel-plugin-transform-react-jsx');
const plugin = require('./index.js');

var example = `const a = <label name="xxx" height="100%"><lol></lol></label>`;

const {code} = babel.transform(example, {plugins: [jsx, plugin]});

console.info(code);