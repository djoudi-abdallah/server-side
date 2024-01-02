const express = require('express');
const router = express.Router();
const Client = require('../models/client'); // Import the Client model

// Create a new client
router.post('/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/clients', async (req, res) => {
    try {
      const clients = await Client.find();
      res.send(clients);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  router.get('/clients/:id', async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      if (!client) {
        return res.status(404).send({ message: 'Client not found' });
      }
      res.send(client);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  router.put('/clients/:id', async (req, res) => {
    try {
      const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!client) {
        return res.status(404).send({ message: 'Client not found' });
      }
      res.send(client);
    } catch (error) {
      res.status(500).send(error);
    }
  });


  router.delete('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).send({ message: 'Client not found' });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
