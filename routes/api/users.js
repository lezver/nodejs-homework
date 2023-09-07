const express = require("express");
const {
	login,
	register,
	current,
	logout,
	updateSubscription,
	updateAvatar,
} = require("../../controllers/user");
const { validateBody, auth, upload } = require("../../middlewares");
const {
	registerSchema,
	loginSchema,
	subscriptionSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/current", auth, current);
router.post("/logout", auth, logout);
router.patch(
	"/subscription",
	auth,
	validateBody(subscriptionSchema),
	updateSubscription
);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
