const mongoose = require("mongoose");
const CounterAbsence = require("./counters/absencecounter");

const AbsenceSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  employe: {
    type: Number,
    ref: "Employe",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
AbsenceSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await CounterAbsence.findByIdAndUpdate(
        { _id: "code" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.code = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

const Absence = mongoose.model("Absence", AbsenceSchema);

module.exports = Absence;
