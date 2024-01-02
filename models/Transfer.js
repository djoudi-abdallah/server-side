const mongoose = require('mongoose');

const TransfertsSchema = new mongoose.Schema({
  dateTransfert: {
    type: Date,
    default: Date.now,
  },
  centre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Centre',
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
  coutEquivalent: {
    type: Number,
    required: true,
  },
});

const Transferts = mongoose.model('Transferts', TransfertsSchema);

module.exports = Transferts;
