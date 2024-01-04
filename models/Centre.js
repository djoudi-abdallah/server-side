const mongoose = require("mongoose");
const Counter = require("./counters/centercounter");

const centreSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  designation: { type: String, required: true },
  name: { type: String, required: true },
  responsable: {
    type: Number,
    ref: "Employee",
    index: true,
  },
});
centreSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counterDoc = await Counter.findByIdAndUpdate(
      { _id: "code" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});

const Centre = mongoose.model("Centre", centreSchema);

module.exports = Centre;
