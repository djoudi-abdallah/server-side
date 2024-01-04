const mongoose = require("mongoose");

const CounterPaiementcrediteSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterPaiementcredite = mongoose.model("CounterPaiementcredite", CounterPaiementcrediteSchema);
module.exports = CounterPaiementcredite;