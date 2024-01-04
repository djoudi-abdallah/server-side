const mongoose = require("mongoose");

const CounterProduitSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterProduit = mongoose.model("CounterProduit", CounterProduitSchema);
module.exports = CounterProduit;