const { wrapper, httpError } = require("../../helpers");
const { Contact, updateFavoriteSchema } = require("../../models");

const chenge = async (req, res) => {
	const { contactId } = req.params;

	const chengeFavorite = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true,
	}).exec();

	if (!chengeFavorite) throw httpError(404, "Not found");

	return res.status(200).send(chengeFavorite);
};

module.exports = { chenge: wrapper(chenge) };
