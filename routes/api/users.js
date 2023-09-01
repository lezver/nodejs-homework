const express = require("express");
const {
	login,
	register,
	current,
	logout,
	updateSubscription,
} = require("../../controllers/user");
const { validateBody, auth } = require("../../middlewares");
const {
	registerSchema,
	loginSchema,
	subscriptionSchema,
} = require("../../models/user");

const router = express.Router();

router.use("/register", validateBody(registerSchema), register);
router.use("/login", validateBody(loginSchema), login);
router.get("/current", auth, current);
router.use("/logout", auth, logout);
router.patch(
	"/subscription",
	auth,
	validateBody(subscriptionSchema),
	updateSubscription
);

module.exports = router;
