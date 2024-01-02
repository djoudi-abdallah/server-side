const express = require("express");
const router = express.Router();
const Massrouf = require("../models/Masrouf");

// Create a new Massrouf entry
router.post("/massroufs", async (req, res) => {
  try {
    const newMassrouf = await Massrouf.create(req.body);
    res.status(201).json(newMassrouf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Massrouf entries
router.get("/massroufs", async (req, res) => {
  try {
    const massroufs = await Massrouf.find();
    res.status(200).json(massroufs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific Massrouf entry by ID
router.get("/massroufs/:id", async (req, res) => {
  try {
    const massrouf = await Massrouf.findById(req.params.id);
    if (!massrouf) {
      return res.status(404).json({ message: "Massrouf entry not found" });
    }
    res.status(200).json(massrouf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific Massrouf entry by ID
router.put("/massroufs/:id", async (req, res) => {
  try {
    const updatedMassrouf = await Massrouf.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMassrouf) {
      return res.status(404).json({ message: "Massrouf entry not found" });
    }
    res.status(200).json(updatedMassrouf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific Massrouf entry by ID
router.delete("/massroufs/:id", async (req, res) => {
  try {
    const deletedMassrouf = await Massrouf.findByIdAndDelete(req.params.id);
    if (!deletedMassrouf) {
      return res.status(404).json({ message: "Massrouf entry not found" });
    }
    res.status(200).json({ message: "Massrouf entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
