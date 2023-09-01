const express = require("express");
const contacts = require("./contacts");
const users = require("./users");
const { auth } = require("../../middlewares");

const router = express.Router();

router.use("/users", users);
router.use("/contacts", auth, contacts);

module.exports = router;
