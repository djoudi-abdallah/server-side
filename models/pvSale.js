const mongoose = require("mongoose");
const CounterPv = require("./counters/pvsalecounter");
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

  contente: {
    type: String,
    required: true,
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
