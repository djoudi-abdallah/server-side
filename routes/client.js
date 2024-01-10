const express = require("express");
const router = express.Router();
const clientcontroller = require("../controllers/clientController");

// Create a new client
router.post("/clients", clientcontroller.createClient);

router.get("/clients", clientcontroller.getAllclients);

router.get("/clients/:id", clientcontroller.getclient);

router.put("/clients/:id", clientcontroller.updateClient);

router.delete("/clients/:id", clientcontroller.deleteClient);

module.exports = router;
