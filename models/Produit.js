const mongoose = require("mongoose");
const CounterProduit = require("./counters/produitcounter");

const produitSchema = new mongoose.Schema({
  code: { type: Number, index: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, default: "premier" },
  price: Number,
});
produitSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await CounterProduit.findByIdAndUpdate(
        { _id: "code" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.code = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});
const Produit = mongoose.model("Produit", produitSchema);

module.exports = Produit;
