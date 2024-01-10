const Employe = require("../models/Employe");
const Absence = require("../models/Absence");

// Create a new absence
exports.createAbsence = async (req, res) => {
  const { employe } = req.body;

  try {
    // Check if the employé exists
    let employeExists = await Employe.findOne({ code: employe });
    if (!employeExists) {
      return res.status(404).send({ message: "Employé not  found " });
    }

    // Check if there is an absence with the same date and employé
    const currentDate = new Date();
    const existingAbsence = await Absence.findOne({
      employe: employe,
      date: currentDate,
    });
    if (existingAbsence) {
      return res
        .status(400)
        .send({ message: "Absence already exists for this employé and date" });
    }

    // Create a new absence
    const absence = new Absence({ employe: employe, date: currentDate });
    await absence.save();

    res.status(201).send(absence);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message || "Internal Server Error");
  }
};


exports.getAllabsences= async (req, res) => {
  try {
    const absences = await Absence.find();
    res.status(200).json(absences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOneabsence=async (req, res) => {
  try {
    const absence = await Absence.findOne({ code: req.params.id });
    if (!absence) {
      return res.status(404).json({ message: "Absence entry not found" });
    }
    res.status(200).json(absence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAbsence= async (req, res) => {
  try {
    const updatedAbsence = await Absence.findOneAndUpdate(
     {code: req.params.id},
      req.body,
      { new: true }
    );
    if (!updatedAbsence) {
      return res.status(404).json({ message: "Absence entry not found" });
    }
    res.status(200).json(updatedAbsence);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAbsence=async (req, res) => {
  try {
    const deletedAbsence = await Absence.findOneAndDelete(req.params.id);
    if (!deletedAbsence) {
      return res.status(404).json({ message: "Absence entry not found" });
    }
    res.status(200).json({ message: "Absence entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};