const mongoose = require('mongoose');

const PVSaleSchema = new mongoose.Schema({
  centreID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Centre',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Create Client model similarly
    required: true,
  },
  produitID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit', // Create Produit model similarly
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  // Add other relevant fields
});

const PVSale = mongoose.model('PVSale', PVSaleSchema);

module.exports = PVSale;
