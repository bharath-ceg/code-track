const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const problemRoutes = require("./routes/problemRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if HTTPS
}));

// EJS View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);

// View Routes (EJS)
app.use("/", viewRoutes);

const PORT = process.env.PORT || 10000;

app.get("/api", (req, res) => {
  res.send("CodeTrack API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
