const mongoose = require('mongoose');

const PVEmployeeAdvanceSchema = new mongoose.Schema({
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

const PVEmployeeAdvance = mongoose.model('PV_EmployeeAdvance', PVEmployeeAdvanceSchema);

module.exports = PVEmployeeAdvance;
