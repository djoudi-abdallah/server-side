const express = require('express');
const router = express.Router();
const Absence = require('../models/absence.model');

// Create a new Absence entry
router.post('/absences', async (req, res) => {
  try {
    const newAbsence = await Absence.create(req.body);
    res.status(201).json(newAbsence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Absence entries
router.get('/absences', async (req, res) => {
  try {
    const absences = await Absence.find();
    res.status(200).json(absences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific Absence entry by ID
router.get('/absences/:id', async (req, res) => {
  try {
    const absence = await Absence.findById(req.params.id);
    if (!absence) {
      return res.status(404).json({ message: 'Absence entry not found' });
    }
    res.status(200).json(absence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific Absence entry by ID
router.put('/absences/:id', async (req, res) => {
  try {
    const updatedAbsence = await Absence.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAbsence) {
      return res.status(404).json({ message: 'Absence entry not found' });
    }
    res.status(200).json(updatedAbsence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific Absence entry by ID
router.delete('/absences/:id', async (req, res) => {
  try {
    const deletedAbsence = await Absence.findByIdAndDelete(req.params.id);
    if (!deletedAbsence) {
      return res.status(404).json({ message: 'Absence entry not found' });
    }
    res.status(200).json({ message: 'Absence entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
