const mongoose = require("mongoose");

const AchatsSchema = new mongoose.Schema({
  dateAchat: {
    type: Date,
    default: Date.now,
  },
  fournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
    required: true,
  },
  produit: {
    type: mongoose.Schema.Types.ObjectId,
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
    required: true,
  },
  montantVerse: {
    type: Number,
    default: 0,
  },
  soldeRestant: {
    type: Number,
    required: true,
  },
  statutPaiement: {
    type: String,
    enum: ["Entièrement payé", "Partiellement payé", "Non payé"],
    default: "Non payé",
  },
});

const Achats = mongoose.model("Achats", AchatsSchema);

module.exports = Achats;
