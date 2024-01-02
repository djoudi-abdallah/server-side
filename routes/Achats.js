const express = require("express");
const router = express.Router();
const Achats = require("../models/Achats");

// Create a new purchase
router.post("/achats", async (req, res) => {
  try {
    const newAchat = await Achats.create(req.body);
    res.status(201).json(newAchat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all purchases
router.get("/achats", async (req, res) => {
  try {
    const achats = await Achats.find();
    res.status(200).json(achats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific purchase by ID
router.get("/achats/:id", async (req, res) => {
  try {
    const achat = await Achats.findById(req.params.id);
    if (!achat) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json(achat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific purchase by ID
router.put("/achats/:id", async (req, res) => {
  try {
    const updatedAchat = await Achats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAchat) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json(updatedAchat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific purchase by ID
router.delete("/achats/:id", async (req, res) => {
  try {
    const deletedAchat = await Achats.findByIdAndDelete(req.params.id);
    if (!deletedAchat) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
