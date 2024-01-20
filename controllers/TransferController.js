const Transferts = require("../models/Transfer");
const Product = require("../models/Produit");
const Centre = require("../models/Centre");

// Create a new transfer
exports.createTrasnsfer = async (req, res) => {
  const { centre, id_produit } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await Centre.findOne({
      code: centre,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }

    // Check if the Product exists
    const productExists = await Product.findOne({ code: id_produit });
    if (!productExists) {
      return res.status(404).send({ message: "Product not found" });
    }

    const produitStockEntry = await ProduitStock.findOne({
      id_produit: id_produit,
    });
    if (produitStockEntry) {
      produitStockEntry.quantite += quantite;
      await produitStockEntry.save();
    } else {
      const newProduitStockEntry = new ProduitStock({
        produit: id_produit,
        quantite: quantite,
        centre,
      });
      await newProduitStockEntry.save();
    }
    const newTransfert = await Transferts.create(req.body);
    res.status(201).json(newTransfert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all transfers
exports.getAlltransfer = async (req, res) => {
  try {
    const transferts = await Transferts.find({ centre: req.params.id });
    res.status(200).json(transferts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific transfer by ID
exports.gettransfer = async (req, res) => {
  try {
    const transfert = await Transferts.findOne({ code: req.params.id });
    if (!transfert) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.status(200).json(transfert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific transfer by ID
exports.updatetransfer = async (req, res) => {
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
};

// Delete a specific transfer by ID
exports.deletetransfer = async (req, res) => {
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
};
