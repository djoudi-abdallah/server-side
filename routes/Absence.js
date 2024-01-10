const express = require("express");
const router = express.Router();
const absenceController = require("../controllers/AbsenceController");

router.post("/absences", absenceController.createAbsence);

router.get("/absences", absenceController.getAllabsences);

// Get a specific Absence entry by ID
router.get("/absences/:id", absenceController.getOneabsence);

// Update a specific Absence entry by ID
router.put("/absences/:id", absenceController.updateAbsence);

// Delete a specific Absence entry by ID
router.delete("/absences/:id", absenceController.deleteAbsence);
module.exports = router;
