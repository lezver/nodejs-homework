const bcrypt = require("bcrypt");
const { wrapper, httpError } = require("../../helpers");
const { User } = require("../../models/user");
const gravatar = require("gravatar");

const register = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).exec();

	if (user) throw httpError(409, "Email in use");

	const hashPassword = await bcrypt.hash(password, 10);

	const avatarURL = gravatar.url(email);

	const newUser = await User.create({
		email,
		password: hashPassword,
		avatarURL,
	});

	return res.status(201).send({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = { register: wrapper(register) };
