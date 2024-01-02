const express = require('express');
const router = express.Router();
const Ventes = require('../models/Vente');

// Create a new sale
router.post('/ventes', async (req, res) => {
  try {
    const newVente = await Ventes.create(req.body);
    res.status(201).json(newVente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sales
router.get('/ventes', async (req, res) => {
  try {
    const ventes = await Ventes.find();
    res.status(200).json(ventes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific sale by ID
router.get('/ventes/:id', async (req, res) => {
  try {
    const vente = await Ventes.findById(req.params.id);
    if (!vente) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(vente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific sale by ID
router.put('/ventes/:id', async (req, res) => {
  try {
    const updatedVente = await Ventes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVente) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(updatedVente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific sale by ID
router.delete('/ventes/:id', async (req, res) => {
  try {
    const deletedVente = await Ventes.findByIdAndDelete(req.params.id);
    if (!deletedVente) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
