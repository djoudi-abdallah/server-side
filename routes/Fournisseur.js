const express = require("express");
const router = express.Router();
const fournisseurcontroller = require("../controllers/FournisseurController");

// Create a new fournisseur
router.post("/fournisseurs", fournisseurcontroller.createFournisseur);

//read all fournisseur

router.get("/fournisseurs", fournisseurcontroller.getAllfournisseur);

//read signle fournisseur
router.get("/fournisseurs/:id", fournisseurcontroller.getFournisseur);
router.put("/fournisseurs/:id", fournisseurcontroller.updateFournisseur);
router.delete("/fournisseurs/:id", fournisseurcontroller.updateFournisseur);
module.exports = router;
