
const Employe = require("../models/Employe");
const Centre = require("../models/Centre");

// Create a new employé
exports.createEmploye = async (req, res) => {
  try {
    const employe = new Employe(req.body);
    await employe.save();
    res.status(201).send(employe);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all employes with additional details
exports.getAllemploye = async (req, res) => {
  try {
    let employes = await Employe.find({centre:req.params.id});
    employes = await Promise.all(
      employes.map(async (employe) => {
        employe = employe.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch client details
        const centre = await Centre.findOne({
          code: employe.centre,
        }).select("nom ");
        employe.centreDetails = centre; // Add client details to employe

        return employe;
      })
    );

    res.status(200).send(employes);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Read a Single Employé by ID
exports.getEmploye = async (req, res) => {
  try {
    let employe = await Employe.findOne({ code: req.params.id });
    if (!employe) {
      return res.status(404).send({ message: "Employé not found" });
    }

    employe = employe.toObject(); // Convert Mongoose document to a plain JavaScript object

    res.send(employe);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Update an Employé by ID
exports.updateEmploye = async (req, res) => {
  try {
    let employe = await Employe.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!employe) {
      return res.status(404).send({ message: "Employé not found" });
    }

    employe = employe.toObject(); // Convert Mongoose document to a plain JavaScript object

    res.send(employe);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete an Employé by ID
exports.deleteEmploye = async (req, res) => {
  try {
    let employe = await Employe.findOneAndDelete({ code: req.params.id });
    if (!employe) {
      return res.status(404).send({ message: "Employé not found" });
    }
    res.send(employe);
  } catch (error) {
    res.status(500).send(error);
  }
};
