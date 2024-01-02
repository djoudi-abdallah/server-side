const mongoose = require('mongoose');

const MonthlySalarySchema = new mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // Create Employee model similarly
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  // Add other relevant fields
});

const MonthlySalary = mongoose.model('MonthlySalary', MonthlySalarySchema);

module.exports = MonthlySalary;
