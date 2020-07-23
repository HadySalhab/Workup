const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { passportCallback } = require("../controllers/auth");
const keys = require("../config/keys");
const User = require("../models/User");

const { googleCallbackURI } = keys.googleCallbackURI;

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: `${googleCallbackURI}/api/v1/auth/google/callback`,
		},
		// verify callback
		async (accessToken, refreshToken, profile, done) => {
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
				done(err);
			}
		}
	)
);

module.exports = passport;
