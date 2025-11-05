require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Employees = require("./routes/employee");

const app = express();

// 🟢 STEP 1: CORS MIDDLEWARE DULUAN (sebelum express.json)
app.use(
    cors({
        origin: [
            "http://localhost:5173", // development frontend
            "http://localhost:3001", // json-api development
            "http://localhost:8080",
            "https://employees-mngmntsstm.onrender.com",
            "https://tmj-employeesmngmnt.web.app"
        ],  
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    })
);

// 🟢 STEP 2: Handle preflight requests (alternative)
// Tidak perlu app.options karena cors() middleware sudah handle semuanya

// 🟢 STEP 3: JSON Parser
app.use(express.json());

// 🟢 STEP 4: Routes
app.use("/employees", Employees);

const port = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(port, () => console.log(`🚀 Server running on ${port}`));
    })
    .catch(err => console.error("❌ DB Connection Error:", err));
