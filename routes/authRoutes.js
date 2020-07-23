const passport = require("../services/passport");
const express = require("express");
const { googleLogin } = require("../controllers/auth");

const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

router.get("/google/callback", googleLogin);

module.exports = router;
