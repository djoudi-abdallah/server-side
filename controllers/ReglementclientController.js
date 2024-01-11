const Reglements = require("../models/ReglementClient");
const centre = require("../models/Centre");
const Client = require("../models/client");

// Create a new payment
exports.createreglementclient = async (req, res) => {
  const { centreID, client } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await centre.findOne({
      code: centreID,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }

    // Check if the fournisseur exists
    const clientExists = await Client.findOne({ code: client });
    if (!clientExists) {
      return res.status(404).send({ message: "client not found" });
    }

    const newReglement = await Reglements.create(req.body);
    res.status(201).json(newReglement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all payments
exports.getAllreglement = async (req, res) => {
  try {
    const reglements = await Reglements.find();
    res.status(200).json(reglements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific payment by ID
exports.getReglement = async (req, res) => {
  try {
    const reglement = await Reglements.findOne({ code: req.params.id });
    if (!reglement) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(reglement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific payment by ID
exports.updatereglement = async (req, res) => {
  try {
    const updatedReglement = await Reglements.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedReglement) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(updatedReglement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific payment by ID
exports.deleteREglement = async (req, res) => {
  try {
    const deletedReglement = await Reglements.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedReglement) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
