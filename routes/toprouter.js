const express = require("express");
const router = express.Router();
const topcontroller = require("../controllers/TopController");
router.get("/centretop/:id", topcontroller.getCentreOverview);
router.get("/centremaintop/:id", topcontroller.getCentreOverviewForCentre1);
router.get("/salestop/:id", topcontroller.getTopSalesDetails);
module.exports = router;
