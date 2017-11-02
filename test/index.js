import pluginTester from 'babel-plugin-tester';

pluginTester({
  plugin: identifierReversePlugin,
  tests: {
    'does not change code with no identifiers': '"hello";',
    'changes this code': {
      code: `var profile = <div>
      <img src="avatar.png" className="profile" />
      <h3>{[user.firstName, user.lastName].join(' ')}</h3>
    </div>;`,
      output: `var profile = React.createElement("div", null,
      React.createElement("img", { src: "avatar.png", className: "profile" }),
      React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
    );`,
    },
  },
});

// normally you would import this from your plugin module
function identifierReversePlugin() {
  return {
    name: 'identifier reverse',
    describe: 'djosajfoajdsofj',
    visitor: {
      Identifier(idPath) {
        idPath.node.name = idPath.node.name.split('').reverse().join('')
      },
    },
  }
}
