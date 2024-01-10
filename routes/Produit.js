const express = require("express");
const router = express.Router();
const Produit = require("../models/Produit");

// Create a new produit
router.post("/produits", async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).send(produit);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/produits", async (req, res) => {
  try {
    const produits = await Produit.find();
    res.send(produits);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/produits/:id", async (req, res) => {
  try {
    const produit = await Produit.findOne({ code: req.params.id });
    if (!produit) {
      return res.status(404).send({ message: "Produit not found" });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/produits/:id", async (req, res) => {
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
});

router.delete("/produits/:id", async (req, res) => {
  try {
    const produit = await Produit.findOneAndDelete({ code: req.params.id });
    if (!produit) {
      return res.status(404).send({ message: "Produit not found" });
    }
    res.send(produit);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
