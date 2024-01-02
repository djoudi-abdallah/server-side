const express = require('express');
const router = express.Router();
const PVSale = require('../models/pvSale');

// Create a new PV sale entry
router.post('/pvsales', async (req, res) => {
  try {
    const newPVSale = await PVSale.create(req.body);
    res.status(201).json(newPVSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all PV sale entries
router.get('/pvsales', async (req, res) => {
  try {
    const pvSales = await PVSale.find();
    res.status(200).json(pvSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific PV sale entry by ID
router.get('/pvsales/:id', async (req, res) => {
  try {
    const pvSale = await PVSale.findById(req.params.id);
    if (!pvSale) {
      return res.status(404).json({ message: 'PV sale entry not found' });
    }
    res.status(200).json(pvSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific PV sale entry by ID
router.put('/pvsales/:id', async (req, res) => {
  try {
    const updatedPVSale = await PVSale.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPVSale) {
      return res.status(404).json({ message: 'PV sale entry not found' });
    }
    res.status(200).json(updatedPVSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific PV sale entry by ID
router.delete('/pvsales/:id', async (req, res) => {
  try {
    const deletedPVSale = await PVSale.findByIdAndDelete(req.params.id);
    if (!deletedPVSale) {
      return res.status(404).json({ message: 'PV sale entry not found' });
    }
    res.status(200).json({ message: 'PV sale entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
