const passport = require("passport");
const User = require("../models/User");
const keys = require("../config/keys");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
	const { name, email, password, passwordConfirm } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		passwordConfirm,
	});
	sendTokenResponse(user, 200, res);
};

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
			sendTokenResponse(user, 200, res);
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

function sendTokenResponse(user, statusCode, res) {
	console.log(user);
	const token = user.getSignedJWT();
	const cookieOptions = {
		expires: new Date(Date.now() + keys.cookieExpire * 24 * 60 * 60 * 1000), //convert to ms
		httpOnly: true, // cookie cannot be access or modified by the browser (to prevent xss attack)
	};
	if (process.env.NODE_ENV === "production") {
		cookieOptions.secure = true; //for encrypted connection:https
	}
	res.cookie(keys.cookieKey, token, cookieOptions);
	res.status(statusCode).json({
		success: true,
		token,
	});
}
