const mongoose = require("mongoose");
const CounterAchat = require("./counters/achatscounter");
const AchatsSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  dateAchat: {
    type: Date,
    default: Date.now,
  },
  id_fournisseur: {
    type: Number,
    ref: "Fournisseur",
    required: true,
  },
  fournisseurname: { type: String, default: "" },
  fournisseurprenom: { type: String, default: "" },
  produitname: { type: String, required: true },
  quantite: {
    type: Number,
    required: true,
  },
  prixUnitaireHT: {
    type: Number,
    required: true,
  },
  montantTotalHT: {
    type: Number,
  },
  montantVerse: {
    type: Number,

    reuired: true,
  },
  soldeRestant: {
    type: Number,
    default: 0,
  },
  statusPaiement: {
    type: String,
    enum: ["Entièrement payé", "Partiellement payé", "Non payé"],
    default: "Non payé",
  },
});

AchatsSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterAchat.findByIdAndUpdate(
        { _id: "code" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.code = counterDoc.seq;
    } catch (err) {
      return next(err);
    }
  } else {
    next();
  }
  try {
    this.montantTotalHT = this.quantite * this.prixUnitaireHT;

    next();
  } catch (err) {
    next(err);
  }
});

const Achats = mongoose.model("Achats", AchatsSchema);

module.exports = Achats;
