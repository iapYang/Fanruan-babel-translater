const babel = require('babel-core');
const plugin = require('./index.js');

var example = `
    a + b + c
`;

const {code} = babel.transform(example, {plugins: [plugin]});

console.info(code);