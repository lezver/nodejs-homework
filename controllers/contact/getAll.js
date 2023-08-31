const { wrapper } = require("../../helpers");
const { Contact } = require("../../models");

const getAll = async (req, res) => {
	const { page = 1, limit = 10, favorite = "" } = req.query;

	const skip = (page - 1) * limit;

	let contacts = "";

	if (favorite === "") {
		contacts = await Contact.find({}, "", {
			skip,
			limit,
		}).exec();
	} else {
		contacts = await Contact.find({ favorite }, "", {
			skip,
			limit,
		}).exec();
	}

	return res.status(200).send(contacts);
};

module.exports = { getAll: wrapper(getAll) };
