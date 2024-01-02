const express = require("express");
const router = express.Router();
const MonthlySalary = require("../models/MonthlySalary");

// Create a new Monthly Salary entry
router.post("/monthly_salaries", async (req, res) => {
  try {
    const newMonthlySalary = await MonthlySalary.create(req.body);
    res.status(201).json(newMonthlySalary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Monthly Salary entries
router.get("/monthly_salaries", async (req, res) => {
  try {
    const monthlySalaries = await MonthlySalary.find();
    res.status(200).json(monthlySalaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific Monthly Salary entry by ID
router.get("/monthly_salaries/:id", async (req, res) => {
  try {
    const monthlySalary = await MonthlySalary.findById(req.params.id);
    if (!monthlySalary) {
      return res
        .status(404)
        .json({ message: "Monthly Salary entry not found" });
    }
    res.status(200).json(monthlySalary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific Monthly Salary entry by ID
router.put("/monthly_salaries/:id", async (req, res) => {
  try {
    const updatedMonthlySalary = await MonthlySalary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMonthlySalary) {
      return res
        .status(404)
        .json({ message: "Monthly Salary entry not found" });
    }
    res.status(200).json(updatedMonthlySalary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific Monthly Salary entry by ID
router.delete("/monthly_salaries/:id", async (req, res) => {
  try {
    const deletedMonthlySalary = await MonthlySalary.findByIdAndDelete(
      req.params.id
    );
    if (!deletedMonthlySalary) {
      return res
        .status(404)
        .json({ message: "Monthly Salary entry not found" });
    }
    res
      .status(200)
      .json({ message: "Monthly Salary entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
