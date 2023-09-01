const { wrapper } = require("../../helpers");

const current = async (req, res) => {
	const { email, subscription } = req.user;

	return res.status(200).send({ email, subscription });
};

module.exports = { current: wrapper(current) };
