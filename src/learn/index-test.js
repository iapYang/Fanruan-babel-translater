const babel = require('babel-core');
const jsx = require('babel-plugin-transform-react-jsx');
const plugin = require('./index.js');

var example = `
    const a = 
        <htape>
            <button width="40"></button>
            <center width="fill">
                <label width="30">1234455</label>
            </center>
            <button  width="40">123</button>
        </htape>
`;

debugger;

const {code} = babel.transform(example, {plugins: [plugin]});

debugger;

console.info(code);