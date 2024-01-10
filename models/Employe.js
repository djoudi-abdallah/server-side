const mongoose = require("mongoose");
const EmployeCounter = require("./counters/employecounter");

const employeSchema = new mongoose.Schema({
  code: { type: Number, index: true, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  salaire_jour: { type: Number, default: 0, required: true },
  salaire: { type: Number, default: 0 },
  centre: { type: Number, ref: "Centre", required: true }, // Reference to the Centre model
});

employeSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counterDoc = await EmployeCounter.findByIdAndUpdate(
      { _id: "code" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.code = counterDoc.seq;
    next();
  } else {
    next();
  }
});
const Employe = mongoose.model("Employe", employeSchema);

module.exports = Employe;
