const passport = require("../services/passport");
const express = require("express");
const { googleLogin, logout } = require("../controllers/auth");

const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);
router.get("/logout", logout);
router.get("/google/callback", googleLogin);

module.exports = router;
