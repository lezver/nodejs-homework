const { wrapper } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;

	console.log(_id);

	const update = await User.findByIdAndUpdate(
		_id,
		{
			subscription,
		},
		{ new: true }
	).exec();

	return res.status(200).send(update);
};

module.exports = { updateSubscription: wrapper(updateSubscription) };
