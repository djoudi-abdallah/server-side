const mongoose = require("mongoose");
const CounterMasrouf = require("./counters/masroufcounter");

const MassroufSchema = new mongoose.Schema({
  code: { type: Number, index: true, unique: true },
  employe: {
    type: Number,
    ref: "Employee", // Create Employee model similarly
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
MassroufSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await CounterMasrouf.findByIdAndUpdate(
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

const Massrouf = mongoose.model("Massrouf", MassroufSchema);

module.exports = Massrouf;
