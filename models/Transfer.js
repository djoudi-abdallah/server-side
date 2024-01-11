const mongoose = require("mongoose");
const Produit = require("./Produit");
const CounterTransfer = require("./counters/transfercounter");

const TransfertsSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  dateTransfert: {
    type: Date,
    default: Date.now,
  },
  
  centre: {
    type: Number,
    ref: "Centre",
    required: true,
  },
  id_produit: {
    type: Number,
    ref: "Produit",
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  coutEquivalent: {
    type: Number,
    required: true,
  },
});

TransfertsSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterTransfer.findByIdAndUpdate(
        { _id: "id_transfer" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id_transfer = counterDoc.seq;
      // Continue with the rest of the pre-save logic...
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
  try {
    const produit = await Produit.findOne({ code: this.id_produit });
    if (!produit) {
      next(new Error("Produit not found"));
    } else {
      this.coutEquivalent = this.quantite * produit.prixUnitaireHT;
      next();
    }
  } catch (err) {
    next(err);
  }
});

const Transferts = mongoose.model("Transferts", TransfertsSchema);

module.exports = Transferts;
