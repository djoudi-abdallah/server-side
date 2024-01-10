const express = require("express");
const router = express.Router();
const masroufcontroller = require("../controllers/MasroufController");

// Create a new Massrouf entry
router.post("/massroufs", masroufcontroller.createMasrouf);

// Get all Massrouf entries
router.get("/massroufs", masroufcontroller.getAllmasrouf);

// Get a specific Massrouf entry by ID
router.get("/massroufs/:id", masroufcontroller.getMasrouf);

// Update a specific Massrouf entry by ID
router.put("/massroufs/:id", masroufcontroller.updateMasrouf);

// Delete a specific Massrouf entry by ID
router.delete("/massroufs/:id", masroufcontroller.deleteMasrouf);
module.exports = router;
