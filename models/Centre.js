const mongoose = require('mongoose');

const centreSchema = new mongoose.Schema({
  code: String,
  designation: String,
  // Add other fields as needed
});

const Centre = mongoose.model('Centre', centreSchema);

module.exports = Centre;
