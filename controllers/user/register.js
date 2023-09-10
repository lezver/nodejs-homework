const bcrypt = require("bcrypt");
const { wrapper, httpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const gravatar = require("gravatar");
const crypto = require("node:crypto");

const { BASE_URL } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).exec();

	if (user) throw httpError(409, "Email in use");

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const verificationToken = crypto.randomUUID();

	const newUser = await User.create({
		email,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `
		<p>To confirm your registration, please click on the link below:</p>
		<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click me</a>
		`,
		text: `To confirm your registration, please click on the link below:\n
		${BASE_URL}/api/users/verify/${verificationToken}`,
	};

	await sendEmail(verifyEmail);

	return res.status(201).send({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = { register: wrapper(register) };
