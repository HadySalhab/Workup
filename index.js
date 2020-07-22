const express = require("express");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

// Connect to db
connectDB();

// Mount routers
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("server listening on port " + PORT);
});
