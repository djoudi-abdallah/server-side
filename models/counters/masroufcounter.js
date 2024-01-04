const mongoose = require("mongoose");

const CounterMasroufSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterMasrouf= mongoose.model("CounterMasrouf", CounterMasroufSchema);
module.exports = CounterMasrouf;