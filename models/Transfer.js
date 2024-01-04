const mongoose = require("mongoose");
const Produit = require("./Produit");

const TransfertsSchema = new mongoose.Schema({
  dateTransfert: {
    type: Date,
    default: Date.now,
  },
  id_transfer: { type: Number, index: true, unique: true },
  centre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Centre",
    required: true,
  },
  id_produit: {
    type: mongoose.Schema.Types.ObjectId,
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
      const counterDoc = await CounterAchat.findByIdAndUpdate(
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
