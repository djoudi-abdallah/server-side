const Produit = require("../models/Produit");
const produitStock = require("../models/produitStock");
const Centre = require("../models/Centre");

// Create a new produit
exports.createProduit = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the product with the same name already exists
    const existingProduit = await Produit.findOne({ name });
    if (existingProduit) {
      return res.status(409).json({ message: "Product already exists." });
    }

    // If the product does not exist, create it
    // You should generate a unique code for the new product here or ensure it is in req.body
    const newProduit = new Produit({
      ...req.body, // This contains all the required fields like name, price, etc.
    });
    await newProduit.save();

    // Fetch the first center by its code
    const firstCentre = await Centre.findOne().sort({ code: 1 }); // Assuming 'code' determines the first center

    // Update or create stock entry for the new product in the first centre
    const updatedStock = await produitStock.findOneAndUpdate(
      { centre: firstCentre.code, produit: newProduit.code },
      { $inc: { quantite: 1 } },
      { new: true, upsert: true } // Options to return the updated document and create it if it doesn't exist
    );

    // Respond with the new product details and updated stock
    res.status(201).json({
      produit: newProduit,
      updatedStock: updatedStock,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllproduit = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.send(produits);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getproduit = async (req, res) => {
  try {
    const produit = await Produit.findOne({ code: req.params.id });
    if (!produit) {
      return res.status(404).send({ message: "Produit not found" });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateproduit = async (req, res) => {
  try {
    const produit = await Produit.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!produit) {
      return res.status(404).send({ message: "Produit not found" });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteproduit = async (req, res) => {
  try {
    const produit = await Produit.findOneAndDelete({ code: req.params.id });
    if (!produit) {
      return res.status(404).send({ message: "Produit not found" });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send(error);
  }
};
