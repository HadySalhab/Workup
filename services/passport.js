const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { passportCallback } = require("../controllers/auth");
const keys = require("../config/keys");
const User = require("../models/User");

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/api/auth/google/callback",
		},
		passportCallback
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		console.log(err);
		done(err, null);
	}
});

module.exports = passport;
