const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { wrapper, httpError } = require("../../helpers");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;

const incorrect = "Email or password is wrong";

const login = async (req, res) => {
	const { email, password } = req.body;

	const compareUser = await User.findOne({ email }).exec();
	if (!compareUser) throw httpError(401, incorrect);
	if (!compareUser.verify) throw httpError(401, "Email not verified");

	const compareUserPassword = await bcrypt.compare(
		password,
		compareUser.password
	);
	if (!compareUserPassword) throw httpError(401, incorrect);

	const payload = {
		id: compareUser._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 });

	await User.findByIdAndUpdate(compareUser._id, { token });

	return res.status(200).send({
		user: {
			email: compareUser.email,
			subscription: compareUser.subscription,
			token,
		},
	});
};

module.exports = { login: wrapper(login) };
