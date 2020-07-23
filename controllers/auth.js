const passport = require("passport");
const User = require("../models/User");
const keys = require("../config/keys");

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
			sendCookie(user._id, 200, res); // TODO: SEND JWT LATER
		}
	})(req, res, next);
};

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = (req, res, next) => {
	res.cookie(keys.cookieKey, "none", {
		expires: new Date(Date.now() + 10 * 1000), // 10s
		httpOnly: true,
	});
	res.status(200).json({
		sucess: true,
		data: {},
	});
};

function sendCookie(data, statusCode, res) {
	console.log(keys.cookieExpire, keys.cookieKey);
	const cookieOptions = {
		expires: new Date(Date.now() + keys.cookieExpire * 24 * 60 * 60 * 1000), //convert to ms
		httpOnly: true, // cookie cannot be access or modified by the browser (to prevent xss attack)
	};
	if ((process.env.NODE_ENV = "production")) {
		cookieOptions.secure = true; //for encrypted connection:https
	}
	res.cookie(keys.cookieKey, data, cookieOptions);
	res.status(statusCode).json({
		success: true,
		data,
	});
}
