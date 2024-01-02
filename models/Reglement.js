const mongoose = require('mongoose');

const ReglementsSchema = new mongoose.Schema({
  dateReglement: {
    type: Date,
    default: Date.now,
  },
  fournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fournisseur',
    required: true,
  },
  montantReglement: {
    type: Number,
    required: true,
  },
});

const Reglements = mongoose.model('Reglements', ReglementsSchema);

module.exports = Reglements;
