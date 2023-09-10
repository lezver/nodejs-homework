const { wrapper, httpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email }).exec();
	if (!user) throw httpError(401, "Email not found");
	if (user.verify) throw httpError(400, "Verification has already been passed");

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `
		<p>To confirm your registration, please click on the link below:</p>
		<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click me</a>
		`,
		text: `To confirm your registration, please click on the link below:\n
		${BASE_URL}/api/users/verify/${user.verificationToken}`,
	};

	await sendEmail(verifyEmail);

	return res.status(200).send({ message: "Verification email sent" });
};

module.exports = { resendVerifyEmail: wrapper(resendVerifyEmail) };
