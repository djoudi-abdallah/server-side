const express = require("express");
const router = express.Router();
const Transferts = require("../models/Transfer");

// Create a new transfer
router.post("/transferts", async (req, res) => {
  try {
    const newTransfert = await Transferts.create(req.body);
    res.status(201).json(newTransfert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transfers
router.get("/transferts", async (req, res) => {
  try {
    const transferts = await Transferts.find();
    res.status(200).json(transferts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific transfer by ID
router.get("/transferts/:id", async (req, res) => {
  try {
    const transfert = await Transferts.findOne({ code: req.params.id });
    if (!transfert) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.status(200).json(transfert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific transfer by ID
router.put("/transferts/:id", async (req, res) => {
  try {
    const updatedTransfert = await Transferts.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTransfert) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.status(200).json(updatedTransfert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific transfer by ID
router.delete("/transferts/:id", async (req, res) => {
  try {
    const deletedTransfert = await Transferts.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedTransfert) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.status(200).json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
