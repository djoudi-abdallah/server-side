const express = require("express");
const router = express.Router();
const Transfertcontroller = require("../controllers/TransferController");

// Create a new transfer
router.post("/transferts", Transfertcontroller.createTrasnsfer);

// Get all transfers
router.get("/transfertsShop/:id", Transfertcontroller.getAlltransfer);

router.get("/transferts", Transfertcontroller.getAllTransfers1);
// Get a specific transfer by ID
router.get("/transferts/:id", Transfertcontroller.gettransfer);

// Update a specific transfer by ID
router.put("/transferts/:id", Transfertcontroller.updatetransfer);
// Delete a specific transfer by ID
router.delete("/transferts/:id", Transfertcontroller.deletetransfer);
module.exports = router;
