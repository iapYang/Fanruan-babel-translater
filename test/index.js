import pluginTester from 'babel-plugin-tester';
import fineUiTranslator from '../src/index.js';

pluginTester({
  plugin: fineUiTranslator,
  fixtures: path.join(__dirname, '__fixtures__'),
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
