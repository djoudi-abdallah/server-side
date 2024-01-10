const Massrouf = require("../models/Masrouf");
const Employe = require("../models/Employe");
const MonthlySalary = require("../models/MonthlySalaries");

// Create a new Massrouf entry
exports.createMasrouf = async (req, res) => {
  const { employe } = req.body;
  const { amount } = req.body;
  try {
    let employeExists = await Employe.findOne({ code: employe });
    if (!employeExists) {
      return res.status(404).send({ message: "Employé not found " });
    }
    let salarym = MonthlySalary.findOne({ employeeID: employe });
    salarym.salary -= amount;
    const newMassrouf = await Massrouf.create(req.body);
    res.status(201).json(newMassrouf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Massrouf entries
exports.getAllmasrouf = async (req, res) => {
  try {
    const massroufs = await Massrouf.find();
    res.status(200).json(massroufs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Massrouf entry by ID
exports.getMasrouf = async (req, res) => {
  try {
    const massrouf = await Massrouf.findOne({ code: req.params.id });
    if (!massrouf) {
      return res.status(404).json({ message: "Massrouf entry not found" });
    }
    res.status(200).json(massrouf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Massrouf entry by ID
exports.updateMasrouf = async (req, res) => {
  try {
    const updatedMassrouf = await Massrouf.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedMassrouf) {
      return res.status(404).json({ message: "Massrouf entry not found" });
    }
    res.status(200).json(updatedMassrouf);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Massrouf entry by ID
exports.deleteMasrouf = async (req, res) => {
  try {
    const deletedMassrouf = await Massrouf.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedMassrouf) {
      return res.status(404).json({ message: "Massrouf entry not found" });
    }
    res.status(200).json({ message: "Massrouf entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
