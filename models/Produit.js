const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  code: String,
  designation: String,
  
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
