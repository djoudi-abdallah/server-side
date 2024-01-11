const PaiementCredit = require("../models/paiementCredite");
const client = require("../models/client");
const centre = require("../models/Centre");

// Create a new Paiement Credit entry
exports.createPaiement = async (req, res) => {
  const { centreID, clientID } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await centre.findOne({
      code: centreID,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }

    // Check if the client exists
    const clienttExists = await client.findOne({ code: clientID });
    if (!clienttExists) {
      return res.status(404).send({ message: "client not found" });
    }

    const newPaiementCredit = await PaiementCredit.create(req.body);
    res.status(201).json(newPaiementCredit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Paiement Credit entries
exports.getAllpaiement = async (req, res) => {
  try {
    const paiementsCredits = await PaiementCredit.find();
    res.status(200).json(paiementsCredits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Paiement Credit entry by ID
exports.getpaiement = async (req, res) => {
  try {
    const paiementCredit = await PaiementCredit.findOne({
      code: req.params.id,
    });
    if (!paiementCredit) {
      return res
        .status(404)
        .json({ message: "Paiement Credit entry not found" });
    }
    res.status(200).json(paiementCredit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Paiement Credit entry by ID
exports.updatepaiement = async (req, res) => {
  try {
    const updatedPaiementCredit = await PaiementCredit.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedPaiementCredit) {
      return res
        .status(404)
        .json({ message: "Paiement Credit entry not found" });
    }
    res.status(200).json(updatedPaiementCredit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Paiement Credit entry by ID
exports.deletedPaiement = async (req, res) => {
  try {
    const deletedPaiementCredit = await PaiementCredit.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedPaiementCredit) {
      return res
        .status(404)
        .json({ message: "Paiement Credit entry not found" });
    }
    res
      .status(200)
      .json({ message: "Paiement Credit entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
