const babel = require('babel-core');
const jsx = require('babel-plugin-transform-react-jsx');
const plugin = require('./index.js');

var example = `
    const a = 
        <label>
            <button></button>
            <tree>
                <label>1234455</label>
            </tree>
            <button>123</button>
        </label>
`;

const {code} = babel.transform(example, {plugins: [jsx, plugin]});

console.info(code);