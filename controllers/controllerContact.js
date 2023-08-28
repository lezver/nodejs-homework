const { Contact, addSchema } = require("../models/modelContact");

const { httpError, wrapper } = require("../helpers");

const getAll = async (req, res) => {
	const contacts = await Contact.find();

	res.status(200).json(contacts);
};

const getById = async (req, res) => {
	const { contactId } = req.params;

	const foundContact = await Contact.findById(contactId).exec();

	if (!foundContact) {
		throw httpError(404, "Not found");
	}

	return res.status(200).json(foundContact);
};

const create = async (req, res) => {
	const { error } = addSchema.validate(req.body);

	if (error) {
		throw httpError(400, error.message);
	}

	console.log(req.body);

	const createContact = await Contact.create(req.body);

	return res.status(201).json(createContact);
};

const update = async (req, res) => {
	const { contactId } = req.params;

	if (!Object.keys(req.body).length) {
		throw httpError(400, "Missing fields");
	}

	const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});

	if (!updateContact) {
		throw httpError(404, "Not found");
	}

	res.status(200).json(updateContact);
};
const chenge = async (req, res) => {
	const { contactId } = req.params;

	if (!Object.keys(req.body).length) {
		throw httpError(400, "Missing field favorite");
	}

	const chengeFavorite = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	});

	if (!chengeFavorite) {
		throw httpError(404, "Not found");
	}

	res.status(200).json(chengeFavorite);
};

const remove = async (req, res) => {
	const { contactId } = req.params;

	const removeContact = await Contact.findByIdAndRemove(contactId);

	if (!removeContact) {
		throw httpError(404, "Not found");
	}

	res.status(200).json(removeContact);
};

module.exports = {
	getAll: wrapper(getAll),
	getById: wrapper(getById),
	create: wrapper(create),
	update: wrapper(update),
	chenge: wrapper(chenge),
	remove: wrapper(remove),
};
