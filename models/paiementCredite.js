const mongoose = require("mongoose");
const Vente = require("./Vente");

const PaiementCreditSchema = new mongoose.Schema({
  code: { type: Number, index: true, unique: true },
  centreID: {
    type: Number,
    ref: "Centre",
    index: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clientID: {
    type: Number,
    ref: "Client", // Create Client model similarly
    index: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
});

PaiementCreditSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterPaiementcredite.findByIdAndUpdate(
        { _id: "code" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.code = counterDoc.seq;
    } catch (err) {
      return next(err);
    }
    try {
      const vente = await Vente.findOne({ client: this.clientID });
      if (vente) {
        if (vente.status === "Partiellement payé") {
          this.amountPaid = vente.montantTotal - vente.montantEncaisse;
        } else if (vente.status === "Non payé") {
          this.amountPaid = vente.montantTotal;
        }
      } else {
        next(new Error("client not found"));
      }
      next();
    } catch (error) {
      next(error);
    }
  }
});

const PaiementCredit = mongoose.model("PaiementCredit", PaiementCreditSchema);

module.exports = PaiementCredite;
