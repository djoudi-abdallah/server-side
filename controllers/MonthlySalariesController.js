const MonthlySalary = require("../models/MonthlySalaries");
const Employe = require("../models/Employe");
const Absence = require("../models/Absence");

// Create a new Monthly Salary entry
exports.createsalaries = async (req, res) => {
  const { employeId } = req.body;
  console.log(employeId);
  try {
    let employeExists = await Employe.findOne({ code: employeId });
    if (!employeExists) {
      return res.status(404).send({ message: "Employé not  found " });
    }
    const count = await Absence.countDocuments({
      employe: employeId,
    }); //count the days of absence
    salarym = employeExists.salaire_jour * (26 - count); //26 cause of the days of works (Samedi-jeudi)
    const newMonthlySalary = await MonthlySalary.create({
      employeID: employeId,
      salary: salarym,
    });

    res.status(201).json(newMonthlySalary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Monthly Salary entries
exports.getAllsalaries = async (req, res) => {
  try {
    const monthlySalaries = await MonthlySalary.find();
    res.status(200).json(monthlySalaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Monthly Salary entry by ID
exports.getsalaries = async (req, res) => {
  try {
    const monthlySalary = await MonthlySalary.findOne({ code: req.params.id });
    if (!monthlySalary) {
      return res
        .status(404)
        .json({ message: "Monthly Salary entry not found" });
    }
    res.status(200).json(monthlySalary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Monthly Salary entry by ID
exports.updatesaalries = async (req, res) => {
  try {
    const updatedMonthlySalary = await MonthlySalary.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedMonthlySalary) {
      return res
        .status(404)
        .json({ message: "Monthly Salary entry not found" });
    }
    res.status(200).json(updatedMonthlySalary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Monthly Salary entry by ID
exports.deletesalaries = async (req, res) => {
  try {
    const deletedMonthlySalary = await MonthlySalary.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedMonthlySalary) {
      return res
        .status(404)
        .json({ message: "Monthly Salary entry not found" });
    }
    res
      .status(200)
      .json({ message: "Monthly Salary entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
