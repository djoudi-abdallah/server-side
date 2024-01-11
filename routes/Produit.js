const express = require("express");
const router = express.Router();
const Produitcontroller = require("../controllers/ProduitController");

// Create a new produit
router.post("/produits", Produitcontroller.createProduit);

router.get("/produits", Produitcontroller.getAllproduit);

router.get("/produits/:id", Produitcontroller.getproduit);

router.put("/produits/:id", Produitcontroller.updateproduit);

router.delete("/produits/:id", Produitcontroller.deleteproduit);

module.exports = router;
