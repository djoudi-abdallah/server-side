const express = require("express");
const router = express.Router();
const PVEmployeeAdvance = require("../models/pvEmployeeAdvances");

// Create a new PV Employee Advance entry
router.post("/pv_employee_advances", async (req, res) => {
  try {
    const newPVEmployeeAdvance = await PVEmployeeAdvance.create(req.body);
    res.status(201).json(newPVEmployeeAdvance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all PV Employee Advance entries
router.get("/pv_employee_advances", async (req, res) => {
  try {
    const pvEmployeeAdvances = await PVEmployeeAdvance.find();
    res.status(200).json(pvEmployeeAdvances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific PV Employee Advance entry by ID
router.get("/pv_employee_advances/:id", async (req, res) => {
  try {
    const pvEmployeeAdvance = await PVEmployeeAdvance.findById(req.params.id);
    if (!pvEmployeeAdvance) {
      return res
        .status(404)
        .json({ message: "PV Employee Advance entry not found" });
    }
    res.status(200).json(pvEmployeeAdvance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific PV Employee Advance entry by ID
router.put("/pv_employee_advances/:id", async (req, res) => {
  try {
    const updatedPVEmployeeAdvance = await PVEmployeeAdvance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPVEmployeeAdvance) {
      return res
        .status(404)
        .json({ message: "PV Employee Advance entry not found" });
    }
    res.status(200).json(updatedPVEmployeeAdvance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific PV Employee Advance entry by ID
router.delete("/pv_employee_advances/:id", async (req, res) => {
  try {
    const deletedPVEmployeeAdvance = await PVEmployeeAdvance.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPVEmployeeAdvance) {
      return res
        .status(404)
        .json({ message: "PV Employee Advance entry not found" });
    }
    res
      .status(200)
      .json({ message: "PV Employee Advance entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
