const express = require("express");
const router = express.Router();
const ProduitStock = require("../models/produitStock");

// Create a new stock entry
router.post("/produitStock", async (req, res) => {
  try {
    const newProduitStock = await ProduitStock.create(req.body);
    res.status(201).json(newProduitStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all stock entries
router.get("/produitStock", async (req, res) => {
  try {
    const produitStock = await ProduitStock.find();
    res.status(200).json(produitStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific stock entry by ID
router.get("/produitStock/:id", async (req, res) => {
  try {
    const produitStockEntry = await ProduitStock.findById(req.params.id);
    if (!produitStockEntry) {
      return res.status(404).json({ message: "Stock entry not found" });
    }
    res.status(200).json(produitStockEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific stock entry by ID
router.put("/produitStock/:id", async (req, res) => {
  try {
    const updatedProduitStock = await ProduitStock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduitStock) {
      return res.status(404).json({ message: "Stock entry not found" });
    }
    res.status(200).json(updatedProduitStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific stock entry by ID
router.delete("/produitStock/:id", async (req, res) => {
  try {
    const deletedProduitStock = await ProduitStock.findByIdAndDelete(
      req.params.id
    );
    if (!deletedProduitStock) {
      return res.status(404).json({ message: "Stock entry not found" });
    }
    res.status(200).json({ message: "Stock entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
