const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
  code: String,
  nom: String,
  prenom: String,
  adresse: String,
  telephone: String,
  solde: Number,
  // Add other fields as needed
});

const Fournisseur = mongoose.model('Fournisseur', fournisseurSchema);

module.exports = Fournisseur;
