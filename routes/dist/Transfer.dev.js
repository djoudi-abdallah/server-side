"use strict";

var express = require("express");

var router = express.Router();

var Transfertcontroller = require("../controllers/TransferController"); // Create a new transfer


router.post("/transferts", Transfertcontroller.createTrasnsfer); // Get all transfers

router.get("/transfertsShop/id", Transfertcontroller.getAlltransfer); // Get a specific transfer by ID

router.get("/transferts/:id", Transfertcontroller.gettransfer); // Update a specific transfer by ID

router.put("/transferts/:id", Transfertcontroller.updatetransfer); // Delete a specific transfer by ID

router["delete"]("/transferts/:id", Transfertcontroller.deletetransfer);
module.exports = router;