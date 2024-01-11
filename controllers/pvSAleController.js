const PVSale = require("../models/pvSale");
const centre = require("../models/Centre");

// Create a new PV sale entry
exports.createPv = async (req, res) => {
  const { centreID } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await centre.findOne({
      code: centreID,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }
    const newPVSale = await PVSale.create(req.body);
    res.status(201).json(newPVSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all PV sale entries
exports.getAllpv = async (req, res) => {
  try {
    const pvSales = await PVSale.find();
    res.status(200).json(pvSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific PV sale entry by ID
exports.getpv = async (req, res) => {
  try {
    const pvSale = await PVSale.findOne({ code: req.params.id });
    if (!pvSale) {
      return res.status(404).json({ message: "PV sale entry not found" });
    }
    res.status(200).json(pvSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific PV sale entry by ID
exports.updatePV = async (req, res) => {
  try {
    const updatedPVSale = await PVSale.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedPVSale) {
      return res.status(404).json({ message: "PV sale entry not found" });
    }
    res.status(200).json(updatedPVSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific PV sale entry by ID
exports.deletePV = async (req, res) => {
  try {
    const deletedPVSale = await PVSale.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedPVSale) {
      return res.status(404).json({ message: "PV sale entry not found" });
    }
    res.status(200).json({ message: "PV sale entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
