const express = require("express");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const connectDB = require("./config/db");

const cookieParser = require("cookie-parser");

const app = express();

// Connect to db
connectDB();

// Middlewares
app.use(cookieParser());
app.use(passport.initialize());

// Mount routers
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("server listening on port " + PORT);
});
