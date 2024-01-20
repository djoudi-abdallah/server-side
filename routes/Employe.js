const express = require("express");
const router = express.Router();
const employecontroller=require("../controllers/EmployeController")

// Create a new employé
router.post("/employes",employecontroller.createEmploye)

// Get all employes with additional details
router.get("/employes/:id", employecontroller.getAllemploye)
// Read a Single Employé by ID
router.get("/employe/:id", employecontroller.getEmploye)
// Update an Employé by ID
router.put("/employes/:id", employecontroller.updateEmploye)
// Delete an Employé by ID
router.delete("/employes/:id", employecontroller.deleteEmploye)
module.exports = router;
