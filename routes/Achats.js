const express = require("express");
const router = express.Router();
const achatscontroller=require("../controllers/AchatsController")

// Create a new purchase
router.post("/achats",achatscontroller.createAchat )
// Get all purchases
router.get("/achats", achatscontroller.getAllAchats)

// Get a specific purchase by ID
router.get("/achats/:id", achatscontroller.getAchat)

// Update a specific purchase by ID
router.put("/achats/:id",achatscontroller.updateAchat )
// Delete a specific purchase by ID
router.delete("/achats/:id",achatscontroller.deleteAchat )
module.exports = router;
