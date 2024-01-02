const mongoose = require('mongoose');

const PaiementCreditSchema = new mongoose.Schema({
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
  amountPaid: {
    type: Number,
    required: true,
  },
  // Add other relevant fields
});

const PaiementCredit = mongoose.model('PaiementCredit', PaiementCreditSchema);

module.exports = PaiementCredite;
