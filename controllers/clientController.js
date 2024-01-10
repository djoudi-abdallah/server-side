
const Client = require("../models/client"); // Import the Client model

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllclients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.send(clients);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getclient = async (req, res) => {
  try {
    const client = await Client.findOne({ code: req.params.id });
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ code: req.params.id });
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    res.send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};


