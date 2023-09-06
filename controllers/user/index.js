const { login } = require("./login");
const { register } = require("./register");
const { current } = require("./current");
const { logout } = require("./logout");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
	login,
	register,
	current,
	logout,
	updateSubscription,
	updateAvatar,
};
