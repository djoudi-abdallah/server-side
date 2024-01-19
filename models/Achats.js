const mongoose = require("mongoose");
const Produit = require("./Produit");
const Employe = require("./Employe");
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
  id_produit: {
    type: Number,
    ref: "Produit",
    required: true,
  },

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
    default: 0,
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
  centre: { type: Number, ref: "Centre", required: true },
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
      this.montantTotalHT = this.quantite * this.prixUnitaireHT;
      if (this.statusPaiement === "Partiellement payé") {
        this.soldeRestant = this.montantTotalHT - this.versement;
      }
      next();
    }
  } catch (err) {
    next(err);
  }
});

const Achats = mongoose.model("Achats", AchatsSchema);

module.exports = Achats;
