const mongoose = require("mongoose");

const AbsenceSchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  employeeID: {
    type: Number,
    ref: "Employee",
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
      const counter = await Counter.findByIdAndUpdate(
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
