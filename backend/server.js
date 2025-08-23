const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/db");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const incomeRoutes=require("./routes/incomeRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists at runtime
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

//adding all the routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);


//starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));