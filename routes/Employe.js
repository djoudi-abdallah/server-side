const express = require('express');
const router = express.Router();
const Employe = require('../models/Employe');

// Create a new employé
router.post('/employes', async (req, res) => {
  try {
    const employe = new Employe(req.body);
    await employe.save();
    res.status(201).send(employe);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read All Employés
router.get('/employes', async (req, res) => {
  try {
    const employes = await Employe.find().populate('centre'); // Populate the 'centre' field with the Centre details
    res.send(employes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a Single Employé by ID
router.get('/employes/:id', async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id).populate('centre');
    if (!employe) {
      return res.status(404).send({ message: 'Employé not found' });
    }
    res.send(employe);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an Employé by ID
router.put('/employes/:id', async (req, res) => {
  try {
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('centre');
    if (!employe) {
      return res.status(404).send({ message: 'Employé not found' });
    }
    res.send(employe);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an Employé by ID
router.delete('/employes/:id', async (req, res) => {
  try {
    const employe = await Employe.findByIdAndDelete(req.params.id).populate('centre');
    if (!employe) {
      return res.status(404).send({ message: 'Employé not found' });
    }
    res.send(employe);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
