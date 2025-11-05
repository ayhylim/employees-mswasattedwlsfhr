const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");
const mongoose = require("mongoose");

// GET all
router.get("/", async (req, res) => {
    const Employees = await Employee.find();
    res.json(Employees);
});

// GET by ID (gunakan custom id field)
router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findOne({id: req.params.id});
        if (!employee) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.json(employee);
    } catch (err) {
        res.status(400).json({message: "Invalid ID format"});
    }
});

// POST - dengan error handling lengkap
router.post("/", async (req, res) => {
    try {
        console.log("POST request body:", req.body); // Debug log

        // Validasi required fields
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.gender ||
            !req.body.position ||
            !req.body.department ||
            !req.body.joiningYear
        ) {
            return res.status(400).json({
                message: "Missing required fields: name, email, gender, position, department, joiningYear"
            });
        }

        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error("POST Error:", err); // Log error ke console

        // Handle validation errors
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation error",
                details: Object.values(err.errors).map(e => e.message)
            });
        }

        // Handle duplicate key errors
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Duplicate field value",
                field: Object.keys(err.keyPattern)[0]
            });
        }

        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
});

// PUT (gunakan custom id)
router.put("/:id", async (req, res) => {
    try {
        const updated = await Employee.findOneAndUpdate({id: req.params.id}, req.body, {new: true});
        if (!updated) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.json(updated);
    } catch (err) {
        res.status(400).json({message: "Invalid ID format"});
    }
});

// PATCH (gunakan custom id)
router.patch("/:id", async (req, res) => {
    try {
        const updated = await Employee.findOneAndUpdate({id: req.params.id}, req.body, {new: true});
        if (!updated) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({message: "Server error"});
    }
});

// DELETE (gunakan custom id)
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Employee.findOneAndDelete({id: req.params.id});
        if (!deleted) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).json({message: "Invalid ID format"});
    }
});

module.exports = router;
