const mongoose = require("mongoose");

const PVSaleSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  centreID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Centre",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  clientID: {
    type: Number,
    ref: "Client", // Create Client model similarly
    required: true,
  },
  produitID: {
    type: Number,
    ref: "Produit", // Create Produit model similarly
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
});

PVSaleSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counterDoc = await CounterPv.findByIdAndUpdate(
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

const PVSale = mongoose.model("PVSale", PVSaleSchema);

module.exports = PVSale;
