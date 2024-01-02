const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  code: String,
  nom: String,
  prenom: String,
  adresse: String,
  telephone: String,
  salaire_jour: Number,
  centre: { type: mongoose.Schema.Types.ObjectId, ref: 'Centre' }, // Reference to the Centre model
  // Add other fields as needed
});

const Employe = mongoose.model('Employe', employeSchema);

module.exports = Employe;
