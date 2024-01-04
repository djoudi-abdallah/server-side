const mongoose = require("mongoose");

const CounterAbsenceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterAbsence = mongoose.model("CounterAbsence", CounterAbsenceSchema);
module.exports = CounterAbsence;
