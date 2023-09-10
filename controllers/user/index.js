const { login } = require("./login");
const { register } = require("./register");
const { current } = require("./current");
const { logout } = require("./logout");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");
const { verifyEmail } = require("./verifyEmail");
const { resendVerifyEmail } = require("./resendVerifyEmail");

module.exports = {
	login,
	register,
	current,
	logout,
	updateSubscription,
	updateAvatar,
	verifyEmail,
	resendVerifyEmail,
};
