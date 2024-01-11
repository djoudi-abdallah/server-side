const express = require("express");
const router = express.Router();
const regfournisseurcontroller = require("../controllers/ReglementfouController");

// Create a new payment
router.post("/reglements", regfournisseurcontroller.createreglementfou);

// Get all payments
router.get("/reglements", regfournisseurcontroller.getAllreglement);
// Get a specific payment by ID
router.get("/reglements/:id", regfournisseurcontroller.getReglement);

// Update a specific payment by ID
router.put("/reglements/:id", regfournisseurcontroller.updatereglement);
// Delete a specific payment by ID
router.delete("/reglements/:id", regfournisseurcontroller.deleteREglement);
module.exports = router;
