const Produit = require("../models/Produit");

// Create a new produit
exports.createProduit = async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).send(produit);
  } catch (error) {
    res.status(400).send(error);
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
    const produit = await Produit.findOne({ code: req.params.id }, req.body, {
      new: true,
    });
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
