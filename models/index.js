const { Contact, addSchema, updateFavoriteSchema } = require("./contact");
const { User, registerSchema, loginSchema, emailSchema } = require("./user");

module.exports = {
	Contact,
	addSchema,
	updateFavoriteSchema,
	User,
	registerSchema,
	loginSchema,
	emailSchema,
};
