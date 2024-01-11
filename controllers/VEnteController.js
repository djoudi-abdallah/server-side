const Ventes = require("../models/Vente");
const ProduitStock = require("../models/produitStock");
const centre = require("../models/Centre");

// Create a new sale
exports.createVente = async (req, res) => {
  const { centreID, clientID, produit, quantitevente } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await centre.findOne({
      code: centreID,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }

    // Check if the client exists
    const clienttExists = await client.findOne({ code: clientID });
    if (!clienttExists) {
      return res.status(404).send({ message: "client not found" });
    }
    // Check if the Product exists on the stock
    const stockExists = await ProduitStock.findOne({ produit: produit });
    if (!stockExists) {
      return res.status(404).send({ message: "Product not found" });
    } else if (stockExists.quantite >= quantitevente) {
      stockExists.quantite -= quantitevente;
    } else {
      return res
        .status(404)
        .send({ message: "the quantite of this product not enaughe" });
    }
    const newVente = await Ventes.create(req.body);
    res.status(201).json(newVente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sales
exports.getAllVente = async (req, res) => {
  try {
    const ventes = await Ventes.find();
    res.status(200).json(ventes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific sale by ID
exports.getVente = async (req, res) => {
  try {
    const vente = await Ventes.findOne(req.params.id);
    if (!vente) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(vente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific sale by ID
exports.updateVente = async (req, res) => {
  try {
    const updatedVente = await Ventes.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedVente) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json(updatedVente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific sale by ID
exports.deleteVente = async (req, res) => {
  try {
    const deletedVente = await Ventes.findOneAndDelete({ code: req.params.id });
    if (!deletedVente) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
