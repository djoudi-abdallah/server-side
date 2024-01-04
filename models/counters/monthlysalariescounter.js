const mongoose = require("mongoose");

const CounterMonthlySalariesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterMonthlySalaries = mongoose.model("CounterMonthlySalaries", CounterMonthlySalariesSchema);
module.exports = CounterMonthlySalaries;