const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementCreditController");

// Create a new Paiement Credit entry
router.post("/paiementscredits", paiementController.createPaiement);

// Get all Paiement Credit entries
router.get("/paiementscredits", paiementController.deletedPaiement);

// Get a specific Paiement Credit entry by ID
router.get("/paiementscredits/:id", paiementController.getpaiement);

// Update a specific Paiement Credit entry by ID
router.put("/paiementscredits/:id", paiementController.updatepaiement);

// Delete a specific Paiement Credit entry by ID
router.delete("/paiementscredits/:id", paiementController.deletedPaiement);

module.exports = router;
