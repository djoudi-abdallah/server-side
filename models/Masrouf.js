const mongoose = require('mongoose');

const MassroufSchema = new mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Create Employee model similarly
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Add other relevant fields
});

const Massrouf = mongoose.model('Massrouf', MassroufSchema);

module.exports = Massrouf;
