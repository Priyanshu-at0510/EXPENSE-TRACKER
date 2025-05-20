const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes=require("./routes/incomeRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income",incomeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
