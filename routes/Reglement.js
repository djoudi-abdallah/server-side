const express = require('express');
const router = express.Router();
const Reglements = require('../models/reglements.model');

// Create a new payment
router.post('/reglements', async (req, res) => {
  try {
    const newReglement = await Reglements.create(req.body);
    res.status(201).json(newReglement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all payments
router.get('/reglements', async (req, res) => {
  try {
    const reglements = await Reglements.find();
    res.status(200).json(reglements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific payment by ID
router.get('/reglements/:id', async (req, res) => {
  try {
    const reglement = await Reglements.findById(req.params.id);
    if (!reglement) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(reglement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific payment by ID
router.put('/reglements/:id', async (req, res) => {
  try {
    const updatedReglement = await Reglements.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReglement) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(updatedReglement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific payment by ID
router.delete('/reglements/:id', async (req, res) => {
  try {
    const deletedReglement = await Reglements.findByIdAndDelete(req.params.id);
    if (!deletedReglement) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
