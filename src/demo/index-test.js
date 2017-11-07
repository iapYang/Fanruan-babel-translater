const babel = require('babel-core');
const plugin = require('./index.js');

var example = `
    var foo = 1;
    if (foo) console.log(foo);
`;

const {code} = babel.transform(example, {plugins: [plugin]});

console.info(code);