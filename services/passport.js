const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { passportCallback } = require("../controllers/auth");
const keys = require("../config/keys");

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

module.exports = passport;
