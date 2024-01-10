const mongoose = require("mongoose");
const employe = require("./Employe");
const CounterMonthlySalaries = require("./counters/monthlysalariescounter");
const MonthlySalarySchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  employeeID: {
    type: Number,
    ref: "Employee", // Create Employee model similarly
    required: true,
  },
  date: { type: Date, default: Date.now },
  salary: {
    type: Number,
    required: true,
  },
});
MonthlySalarySchema.pre("save", async function (next) {
  try {
    const counterDoc = await CounterMonthlySalaries.findByIdAndUpdate(
      { _id: "code" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.code = counterDoc.seq;
    next();
  } catch (err) {
    next(err);
  }
});

const MonthlySalary = mongoose.model("MonthlySalary", MonthlySalarySchema);

module.exports = MonthlySalary;
