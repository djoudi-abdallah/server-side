const mongoose = require('mongoose');

const ProduitStockSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
    required: true,
  },
  fournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fournisseur',
    required: true,
  },
  dateAchat: {
    type: Date,
    default: Date.now,
  },
  quantite: {
    type: Number,
    required: true,
  },
  prixUnitaire: {
    type: Number,
    required: true,
  },
});

const ProduitStock = mongoose.model('ProduitStock', ProduitStockSchema);

module.exports = ProduitStock;
