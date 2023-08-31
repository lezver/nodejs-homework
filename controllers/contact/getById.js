const { wrapper, httpError } = require("../../helpers");
const { Contact } = require("../../models");

const getById = async (req, res) => {
	const { contactId } = req.params;

	const foundContact = await Contact.findById(contactId).exec();

	if (!foundContact) throw httpError(404, "Not found");

	return res.status(200).json(foundContact);
};

module.exports = { getById: wrapper(getById) };
