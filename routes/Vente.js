const express = require("express");
const router = express.Router();
const ventecontroller = require("../controllers/VenteController");
const topController = require("../controllers/TopController");

// Create a new sale
router.post("/ventes", ventecontroller.createVente);

router.get("/ventesTop", topController.getTopSalesDetails);
// Get all sales
router.get("/ventes/:id", ventecontroller.getAllVente);
// Get a specific sale by ID
router.get("/vente/:id", ventecontroller.getVente);

// Update a specific sale by ID
router.put("/ventes/:id", ventecontroller.updateVente);
// Delete a specific sale by ID
router.delete("/ventes/:id", ventecontroller.deleteVente);
module.exports = router;
