const express = require("express");
const {
	getAll,
	getById,
	create,
	update,
	chenge,
	remove,
} = require("../../controllers/contact");

const { isValidId, validateBody } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../models");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(addSchema), create);

router.put("/:contactId", isValidId, validateBody(addSchema), update);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateBody(updateFavoriteSchema),
	chenge
);

router.delete("/:contactId", isValidId, remove);

module.exports = router;
