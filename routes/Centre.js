const express = require('express');
const router = express.Router();
const Centre = require('../models/Centre');

// Create a new centre
router.post('/centres', async (req, res) => {
  try {
    const centre = new Centre(req.body);
    await centre.save();
    res.status(201).send(centre);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read All Centres
router.get('/centres', async (req, res) => {
  try {
    const centres = await Centre.find();
    res.send(centres);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a Single Centre by ID
router.get('/centres/:id', async (req, res) => {
  try {
    const centre = await Centre.findById(req.params.id);
    if (!centre) {
      return res.status(404).send({ message: 'Centre not found' });
    }
    res.send(centre);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Centre by ID
router.put('/centres/:id', async (req, res) => {
  try {
    const centre = await Centre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!centre) {
      return res.status(404).send({ message: 'Centre not found' });
    }
    res.send(centre);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Centre by ID
router.delete('/centres/:id', async (req, res) => {
  try {
    const centre = await Centre.findByIdAndDelete(req.params.id);
    if (!centre) {
      return res.status(404).send({ message: 'Centre not found' });
    }
    res.send(centre);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
