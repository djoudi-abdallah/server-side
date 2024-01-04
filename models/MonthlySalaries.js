const mongoose = require("mongoose");
const masrouf = require("./Masrouf");
const employe = require("./Employe");
const MonthlySalarySchema = new mongoose.Schema({
  code: { type: Number, unique: true, index: true },
  employeeID: {
    type: Number,
    ref: "Employee", // Create Employee model similarly
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
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
  try {
    let emp = await employe.findById(this.employeeID);
    let mass = await masrouf.findById(this.employeeID);
    if (!emp) throw Error(`No such employee with id ${this.employeeID}`);
    else {
      this.salary = emp.salaire_jour * 26 - mass.amount;
    }
  } catch (err) {
    next(err);
  }
});

const MonthlySalary = mongoose.model("MonthlySalary", MonthlySalarySchema);

module.exports = MonthlySalary;
