const Centre = require("../models/Centre");
const Employe = require("../models/Employe");


// Create a new centre
exports.createCentre = async (req, res) => {
  try {
    const { responsable } = req.body;
    // Check if the employé exists
    let employeExists = await Employe.findOne({ code: responsable });
    if (!employeExists) {
      return res.status(404).send({ message: "Employé not found " });
    }

    const centre = new Centre(req.body);
    await centre.save();
    res.status(201).send(centre);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Read All Centres
exports.getAllcentres = async (req, res) => {
  try {
    const centres = await Centre.find();
    res.send(centres);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read a Single Centre by ID
exports.getcentre = async (req, res) => {
  try {
    const centre = await Centre.findOne({ code: req.params.id });
    if (!centre) {
      return res.status(404).send({ message: "Centre not found" });
    }
    res.send(centre);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a Centre by ID
exports.updateCentre = async (req, res) => {
  try {
    const centre = await Centre.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!centre) {
      return res.status(404).send({ message: "Centre not found" });
    }
    res.send(centre);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a Centre by ID
exports.deleteCentre = async (req, res) => {
  try {
    const centre = await Centre.findOneAndDelete({ code: req.params.id });
    if (!centre) {
      return res.status(404).send({ message: "Centre not found" });
    }
    res.send(centre);
  } catch (error) {
    res.status(500).send(error);
  }
};
