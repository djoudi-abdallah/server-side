const mongoose = require("mongoose");
const CounterFournisseur = require("./counters/fournisseurcounter");

const fournisseurSchema = new mongoose.Schema({
  code: { type: Number, index: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  solde: { type: Number, required: true },
});
fournisseurSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterFournisseur.findByIdAndUpdate(
      { _id: "code" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.code = counter.seq;
    next();
  } else {
    next();
  }
});
const Fournisseur = mongoose.model("Fournisseur", fournisseurSchema);

module.exports = Fournisseur;
