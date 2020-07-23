const passport = require("../services/passport");
const express = require("express");
const { googleLogin, logout, register } = require("../controllers/auth");

const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);
router.post("/register", register);
router.get("/logout", logout);
router.get("/google/callback", googleLogin);

module.exports = router;
