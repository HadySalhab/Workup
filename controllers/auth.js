const User = require("../models/User");

// @desc      Register,Login user with google oauth
// @route     GET /api/v1/auth/google
// @access    Public
exports.passportCallback = (accessToken, refreshToken, profile, done) => {
	new User({
		googleId: profile.id,
		name: profile.displayName,
		photo: profile.photos[0].value,
		email: profile.emails[0].value,
	}).save();
};
