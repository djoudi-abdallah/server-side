const mongoose = require('mongoose');

const ActivitySummarySchema = new mongoose.Schema({
  centerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center', // Create Center model similarly
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  salesAmount: {
    type: Number,
    required: true,
  },
  transfersAmount: {
    type: Number,
    required: true,
  },
  profit: {
    type: Number,
    required: true,
  },
  // Add other relevant fields
});

const ActivitySummary = mongoose.model('ActivitySummary', ActivitySummarySchema);

module.exports = ActivitySummary;
