const express = require("express");
const {
	getAll,
	getById,
	create,
	update,
	chenge,
	remove,
} = require("../../controllers/controllerContact");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", create);

router.put("/:contactId", isValidId, update);

router.patch("/:contactId/favorite", isValidId, chenge);

router.delete("/:contactId", isValidId, remove);

module.exports = router;
