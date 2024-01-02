const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  code: String,
  nom: String,
  prenom: { type: String, required: true },
  adresse: String,
  telephone: String,
  credit: Number,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
