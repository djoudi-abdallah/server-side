const mongoose = require('mongoose');

const AbsenceSchema = new mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Create Employee model similarly
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // Add other relevant fields
});

const Absence = mongoose.model('Absence', AbsenceSchema);

module.exports = Absence;
