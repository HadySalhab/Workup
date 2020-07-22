const User = require("../models/User");

// @desc      Register,Login user with google oauth
// @route     GET /api/v1/auth/google
// @access    Public
exports.passportCallback = async (accessToken, refreshToken, profile, done) => {
	try {
		const existingUser = await User.findOne({ googleId: profile.id });
		if (existingUser) {
			return done(null, existingUser);
		}
		const user = await new User({
			googleId: profile.id,
			name: profile.displayName,
			photo: profile.photos[0].value,
			email: profile.emails[0].value,
		}).save();
		done(null, user);
	} catch (err) {
		console.log(err);
		done(err, null);
	}
};
