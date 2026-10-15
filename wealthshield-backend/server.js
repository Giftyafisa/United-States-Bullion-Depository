require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

connectDB();

const app = express();
const allowedOriginPatterns = [
	/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
	/^https:\/\/([a-z0-9-]+\.)*onrender\.com$/
];
const extraOrigins = String(process.env.ALLOWED_ORIGINS || "")
	.split(",")
	.map((s) => s.trim())
	.filter(Boolean);

const isAllowedOrigin = (origin) => {
	if (!origin) return true;
	if (allowedOriginPatterns.some((re) => re.test(origin))) return true;
	return extraOrigins.includes(origin);
};

app.use(cors({
	origin(origin, callback) {
		if (isAllowedOrigin(origin)) {
			callback(null, true);
			return;
		}

		callback(new Error("Not allowed by CORS"));
	}
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
	res.json({ ok: true, mongo: connectDB.isMongoConnected() });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Serve static files from the parent directory (frontend) - after API routes
app.use(express.static(path.join(__dirname, '../')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
