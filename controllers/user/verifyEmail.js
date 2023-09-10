const { wrapper, httpError } = require("../../helpers");
const { User } = require("../../models");

const verifyEmail = async (req, res) => {
	const { verificationToken } = req.params;

	const user = await User.findOne({ verificationToken }).exec();
	if (!user) throw httpError(404, "User not found");

	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: null,
	}).exec();

	return res.status(200).send({ message: "Verification successful" });
};

module.exports = { verifyEmail: wrapper(verifyEmail) };
