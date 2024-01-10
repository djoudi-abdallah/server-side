const express = require("express");
const router = express.Router();
const centrecontroller = require("../controllers/CentreController");

// Create a new centre
router.post("/centres",centrecontroller.createCentre);

// Read All Centres
router.get("/centres", centrecontroller.getAllcentres)

// Read a Single Centre by ID
router.get("/centres/:id", centrecontroller.getcentre)
// Update a Centre by ID
router.put("/centres/:id", centrecontroller.updateCentre)

// Delete a Centre by ID
router.delete("/centres/:id", centrecontroller.deleteCentre)

module.exports = router;
