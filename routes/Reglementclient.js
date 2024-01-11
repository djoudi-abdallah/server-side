const express = require("express");
const router = express.Router();
const regclientcontroller = require("../controllers/ReglementclientController");

// Create a new payment
router.post("/reglements", regclientcontroller.createreglementclient);

// Get all payments
router.get("/reglements", regclientcontroller.getAllreglement);

// Get a specific payment by ID
router.get("/reglements/:id", regclientcontroller.getReglement);

// Update a specific payment by ID
router.put("/reglements/:id", regclientcontroller.updatereglement);

// Delete a specific payment by ID
router.delete("/reglements/:id", regclientcontroller.deleteREglement);
module.exports = router;
