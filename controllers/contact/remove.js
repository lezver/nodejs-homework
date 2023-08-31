const { httpError, wrapper } = require("../../helpers");
const { Contact } = require("../../models");

const remove = async (req, res) => {
	const { contactId } = req.params;

	const removeContact = await Contact.findByIdAndRemove(contactId).exec();

	if (!removeContact) throw httpError(404, "Not found");

	res.status(200).send(removeContact);
};

module.exports = { remove: wrapper(remove) };
