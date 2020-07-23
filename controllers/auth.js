const passport = require("passport");
const User = require("../models/User");

// @desc      Register,Login user with google oauth
// @route     GET /api/v1/auth/google/
// @access    Public
exports.googleLogin = (req, res, next) => {
	passport.authenticate("google", { session: false }, (err, user, info) => {
		if (err) {
			console.log(err);
			res.status(500).json({
				success: false,
				message: "Server error",
			});
		} else {
			console.log(user);
			res.status(200).json({
				success: true,
				message: "Logged in",
			});
		}
	})(req, res, next);
};
