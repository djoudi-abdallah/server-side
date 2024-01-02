const express = require('express');
const router = express.Router();
const Fournisseur = require('../models/Fournisseur');

// Create a new fournisseur
router.post('/fournisseurs', async (req, res) => {
  try {
    const fournisseur = new Fournisseur(req.body);
    await fournisseur.save();
    res.status(201).send(fournisseur);
  } catch (error) {
    res.status(400).send(error);
  }
});

//read all fournisseur

router.get('/fournisseurs', async (req, res) => {
    try {
      const fournisseurs = await Fournisseur.find();
      res.send(fournisseurs);
    } catch (error) {
      res.status(500).send(error);
    }
  });


//read signle fournisseur
  router.get('/fournisseurs/:id', async (req, res) => {
    try {
      const fournisseur = await Fournisseur.findById(req.params.id);
      if (!fournisseur) {
        return res.status(404).send({ message: 'Fournisseur not found' });
      }
      res.send(fournisseur);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.put('/fournisseurs/:id', async (req, res) => {
    try {
      const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!fournisseur) {
        return res.status(404).send({ message: 'Fournisseur not found' });
      }
      res.send(fournisseur);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.delete('/fournisseurs/:id', async (req, res) => {
    try {
      const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
      if (!fournisseur) {
        return res.status(404).send({ message: 'Fournisseur not found' });
      }
      res.send(fournisseur);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  

module.exports = router;
