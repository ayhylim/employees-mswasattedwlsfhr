const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./db/connect");
const Employee = require("./models/employee");

const migrate = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

        await Employee.deleteMany({});
        await Employee.insertMany(data.employees);

        console.log("✅ Migration success!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Migration failed:", err);
        process.exit(1);
    }
};

migrate();
