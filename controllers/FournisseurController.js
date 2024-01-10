const Fournisseur = require("../models/Fournisseur");

// Create a new fournisseur
exports.createFournisseur=async (req, res) => {
  try {
    const fournisseur = new Fournisseur(req.body);
    await fournisseur.save();
    res.status(201).send(fournisseur);
  } catch (error) {
    res.status(400).send(error);
  }
};

//read all fournisseur

exports.getAllfournisseur= async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.send(fournisseurs);
  } catch (error) {
    res.status(500).send(error);
  }
};

//read signle fournisseur
exports.getFournisseur= async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOne({ code: req.params.id });
    if (!fournisseur) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }
    res.send(fournisseur);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateFournisseur= async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!fournisseur) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }
    res.send(fournisseur);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteFournisseur= async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOneAndDelete({
      code: req.params.id,
    });
    if (!fournisseur) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }
    res.send(fournisseur);
  } catch (error) {
    res.status(500).send(error);
  }
};


