
const ProduitStock = require("../models/produitStock");
const Product = require("../models/Produit");
const centre = require("../models/Centre");

// Create a new stock entry
exports.createProduitstock = async (req, res) => {
  const { centreID, produit } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await centre.findOne({
      code: centreID,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }

    // Check if the Product exists
    const productExists = await Product.findOne({ code: produit });
    if (!productExists) {
      return res.status(404).send({ message: "Product not found" });
    }
    const newProduitStock = await ProduitStock.create(req.body);
    res.status(201).json(newProduitStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stock entries
exports.getAllproduitstock = async (req, res) => {
  try {
    const produitStock = await ProduitStock.find();
    res.status(200).json(produitStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific stock entry by ID
exports.getproduitstock = async (req, res) => {
  try {
    const produitStockEntry = await ProduitStock.findOne({
      code: req.params.id,
    });
    if (!produitStockEntry) {
      return res.status(404).json({ message: "Stock entry not found" });
    }
    res.status(200).json(produitStockEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific stock entry by ID
exports.updateProduitstock = async (req, res) => {
  try {
    const updatedProduitStock = await ProduitStock.findOneAndUpdate(
      { code: req.params.id },
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
};

// Delete a specific stock entry by ID
exports.deleteProduitStock = async (req, res) => {
  try {
    const deletedProduitStock = await ProduitStock.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedProduitStock) {
      return res.status(404).json({ message: "Stock entry not found" });
    }
    res.status(200).json({ message: "Stock entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
