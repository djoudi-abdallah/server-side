const express = require("express");
const router = express.Router();
const PVcontroller = require("../controllers/pvSAleController");

// Create a new PV sale entry
router.post("/pvsales", PVcontroller.createPv);

// Get all PV sale entries
router.get("/pvsales/:id", PVcontroller.getAllpv);
// Get a specific PV sale entry by ID
router.get("/pvsale/:id", PVcontroller.getpv);

// Update a specific PV sale entry by ID
router.put("/pvsales/:id", PVcontroller.updatePV);
// Delete a specific PV sale entry by ID
router.delete("/pvsales/:id", PVcontroller.deletePV);

module.exports = router;
