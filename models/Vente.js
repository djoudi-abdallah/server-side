const mongoose = require('mongoose');

const VentesSchema = new mongoose.Schema({
  dateVente: {
    type: Date,
    default: Date.now,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  prixUnitaire: {
    type: Number,
    required: true,
  },
  montantTotal: {
    type: Number,
    required: true,
  },
  montantEncaisse: {
    type: Number,
    default: 0,
  },
  resteAPayer: {
    type: Number,
    required: true,
  },
});

const Ventes = mongoose.model('Ventes', VentesSchema);

module.exports = Ventes;
