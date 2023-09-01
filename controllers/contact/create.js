const { wrapper, httpError } = require("../../helpers");
const { addSchema, Contact } = require("../../models");

const create = async (req, res) => {
	const createContact = await Contact.create(req.body);

	return res.status(201).send(createContact);
};

module.exports = { create: wrapper(create) };
