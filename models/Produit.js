const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  code: { type: Number, index: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, default: "premier" },
  price: Number,
});

const Produit = mongoose.model("Produit", produitSchema);

module.exports = Produit;
