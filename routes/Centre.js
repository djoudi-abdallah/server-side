const express = require("express");
const router = express.Router();
const centrecontroller = require("../controllers/CentreController");
const centreTop = require("../controllers/TopController");

// Create a new centre
router.post("/centres", centrecontroller.createCentre);
//top of centre
router.get("/centresTop", centreTop.getCentreOverviewForCentre1);
// get top of the centres

router.get("/centresTop/:id", centreTop.getCentreOverview);
// Read All Centres
router.get("/centres", centrecontroller.getAllcentres);

// Read a Single Centre by ID
router.get("/centres/:id", centrecontroller.getcentre);
// Update a Centre by ID
router.put("/centres/:id", centrecontroller.updateCentre);

// Delete a Centre by ID
router.delete("/centres/:id", centrecontroller.deleteCentre);

module.exports = router;
