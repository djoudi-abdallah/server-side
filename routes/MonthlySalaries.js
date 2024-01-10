const express = require("express");
const router = express.Router();
const salariescontroller = require("../controllers/MonthlySalariesController");

// Create a new Monthly Salary entry
router.post("/monthly_salaries", salariescontroller.createsalaries);

// Get all Monthly Salary entries
router.get("/monthly_salaries", salariescontroller.getAllsalaries);
// Get a specific Monthly Salary entry by ID
router.get("/monthly_salaries/:id", salariescontroller.getsalaries);
// Update a specific Monthly Salary entry by ID
router.put("/monthly_salaries/:id", salariescontroller.updatesaalries);
// Delete a specific Monthly Salary entry by ID
router.delete("/monthly_salaries/:id", salariescontroller.deletesalaries);

module.exports = router;
