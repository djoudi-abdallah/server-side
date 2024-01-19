const express = require("express");
const router = express.Router();
const ProduitStockcontroller = require("../controllers/produitStockController");

// Create a new stock entry
router.post("/produitStock", ProduitStockcontroller.createProduitstock);

// Get all stock entries
router.get("/produitStockShop/:id", ProduitStockcontroller.getAllproduitstock);

// Get a specific stock entry by ID
router.get("/produitStock/:id", ProduitStockcontroller.getproduitstock);

// Update a specific stock entry by ID
router.put("/produitStock/:id", ProduitStockcontroller.updateProduitstock);
// Delete a specific stock entry by ID
router.delete("/produitStock/:id", ProduitStockcontroller.deleteProduitStock);
module.exports = router;
