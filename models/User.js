const mongoose = require("mongoose");
const validator = require("validator");

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

module.exports = mongoose.model("users", userSchema);
