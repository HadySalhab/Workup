const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	googleId: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		required: [true, "Please add a name"],
	},
	email: {
		type: String,
		required: [
			function () {
				return this.googleId === "" || this.googleId === null;
			},
			"Please provide an email",
		],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	role: {
		type: String,
		enum: ["user", "premium-user"],
		default: "user",
	},
	photo: {
		type: String,
		default: "default.jpg",
	},
	password: {
		type: String,
		required: [
			function () {
				return this.googleId === "" || this.googleId === null;
			},
			"Please provide a password",
		],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [
			function () {
				return this.googleId === "" || this.googleId === null;
			},
			"Please confirm your password",
		],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords are not the same",
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
});

// https://mongoosejs.com/docs/middleware.html#order Save/Validate Hooks
// pre('save') will run after the validations
userSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified (created,modified)
	if (!this.isModified("password")) return next();
	// Hash the password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	// Delete passwordConfirm field (at this stage,validators have been executed)
	this.passwordConfirm = undefined;
	next();
});

// https://mongoosejs.com/docs/guide.html#methods (instance methods)
// Sign JWT and return
userSchema.methods.getSignedJWT = function () {
	return jwt.sign({ id: this._id }, keys.jwtSecret, {
		expiresIn: keys.jwtExpire,
	});
};

module.exports = mongoose.model("users", userSchema);
