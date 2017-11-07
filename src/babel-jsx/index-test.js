const babel = require('babel-core');
const plugin = require('./index.js');

var example = `
    <xxx>lol</xxx>
`;

const {code} = babel.transform(example, {plugins: [plugin]});

console.info(code);