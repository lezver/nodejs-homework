const { wrapper, httpError } = require("../../helpers");
const { Contact } = require("../../models");

const update = async (req, res) => {
	const { contactId } = req.params;

	const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	}).exec();

	if (!updateContact) throw httpError(404, "Not found");

	return res.status(200).send(updateContact);
};

module.exports = { update: wrapper(update) };
