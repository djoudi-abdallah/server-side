const express = require("express");
const router = express.Router();
const PaiementCredit = require("../models/paiementCredite");

// Create a new Paiement Credit entry
router.post("/paiementscredits", async (req, res) => {
  try {
    const newPaiementCredit = await PaiementCredit.create(req.body);
    res.status(201).json(newPaiementCredit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Paiement Credit entries
router.get("/paiementscredits", async (req, res) => {
  try {
    const paiementsCredits = await PaiementCredit.find();
    res.status(200).json(paiementsCredits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific Paiement Credit entry by ID
router.get("/paiementscredits/:id", async (req, res) => {
  try {
    const paiementCredit = await PaiementCredit.findOne({
      code: req.params.id,
    });
    if (!paiementCredit) {
      return res
        .status(404)
        .json({ message: "Paiement Credit entry not found" });
    }
    res.status(200).json(paiementCredit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific Paiement Credit entry by ID
router.put("/paiementscredits/:id", async (req, res) => {
  try {
    const updatedPaiementCredit = await PaiementCredit.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedPaiementCredit) {
      return res
        .status(404)
        .json({ message: "Paiement Credit entry not found" });
    }
    res.status(200).json(updatedPaiementCredit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific Paiement Credit entry by ID
router.delete("/paiementscredits/:id", async (req, res) => {
  try {
    const deletedPaiementCredit = await PaiementCredit.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedPaiementCredit) {
      return res
        .status(404)
        .json({ message: "Paiement Credit entry not found" });
    }
    res
      .status(200)
      .json({ message: "Paiement Credit entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
