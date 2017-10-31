require("@babel/core").transform(`var profile = <div>
<img src="avatar.png" className="profile" />
<h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;`, {
    plugins: ["src/index.js"]
});