const mongoose = require("mongoose");

const ReglementsSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  dateReglement: {
    type: Date,
    default: Date.now,
  },
  fournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
    required: true,
  },
  achats: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Achats",
    required: true,
  },
  montantReglement: {
    type: Number,
    required: true,
  },
});

ReglementsSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterReglement.findByIdAndUpdate(
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

const Reglements = mongoose.model("Reglements", ReglementsSchema);

module.exports = Reglements;
