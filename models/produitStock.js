const mongoose = require("mongoose");
const CounterProduitStock = require("./counters/produitstockcounter");

const ProduitStockSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  produit: {
    type: Number,
    ref: "Produit",
    required: true,
  },
  fournisseur: {
    type: Number,
    ref: "Fournisseur",
    required: true,
  },
  dateAchat: {
    type: Date,
    default: Date.now,
  },
  quantite: {
    type: Number,
    required: true,
  },
});
ProduitStockSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterProduitStock.findByIdAndUpdate(
        { _id: "code" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.code = counterDoc.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const ProduitStock = mongoose.model("ProduitStock", ProduitStockSchema);

module.exports = ProduitStock;
