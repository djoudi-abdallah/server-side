const Ventes = require("../models/Vente");
const ProduitStock = require("../models/produitStock");
const Centre = require("../models/Centre");
const Client = require("../models/client");
const Product = require("../models/Produit");

// ... other required models

// Create a new sale
exports.createVente = async (req, res) => {
  const { centre, client, produit, quantite } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await Centre.findOne({
      code: centre,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }
    console.log(quantite);
    // Check if the client exists
    const clienttExists = await Client.findOne({ code: client });
    if (!clienttExists) {
      return res.status(404).send({ message: "client not found" });
    }
    // Check if the Product exists on the stock
    const stockExists = await ProduitStock.findOne({ produit: produit });
    if (!stockExists) {
      return res.status(404).send({ message: "Product not found" });
    }
    if (stockExists && stockExists.quantite >= quantite) {
      stockExists.quantite -= quantite;
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
    // Fetch all ventes
    const ventes = await Ventes.find({centre:req.params.id});

    // Fetch all clients and products and create lookup objects
    const clients = await Client.find();
    const produits = await Product.find();
    const clientLookup = clients.reduce((acc, client) => {
      acc[client.code] = client.nom;
      return acc;
    }, {});
    const produitLookup = produits.reduce((acc, produit) => {
      acc[produit.code] = produit.name; 
      return acc;
    }, {});

    // Combine ventes with client and product names
    const ventesWithDetails = ventes.map((vente) => ({
      ...vente.toObject(),
      clientNom: clientLookup[vente.client],
      produitNom: produitLookup[vente.produit],
    }));

    res.status(200).json(ventesWithDetails);
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
