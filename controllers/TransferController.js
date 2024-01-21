const Transferts = require("../models/Transfer");
const Product = require("../models/Produit");
const Centre = require("../models/Centre");
const ProduitStock = require("../models/produitStock");
// Create a new transfer
exports.createTrasnsfer = async (req, res) => {
  const { centre, id_produit, quantite } = req.body;
  try {
    // Check if the centre exists
    const centreExists = await Centre.findOne({
      code: centre,
    });
    if (!centreExists) {
      return res.status(404).send({ message: "centre not found" });
    }

    // Check if the Product exists
    const productExists = await Product.findOne({ code: id_produit });
    if (!productExists) {
      return res.status(404).send({ message: "Product not found" });
    }

    const produitStockEntry = await ProduitStock.findOne({
      id_produit: id_produit,
    });
    if (produitStockEntry) {
      produitStockEntry.quantite += quantite;
      await produitStockEntry.save();
    } else {
      const newProduitStockEntry = new ProduitStock({
        produit: id_produit,
        quantite: quantite,
        centre,
      });
      await newProduitStockEntry.save();
    }
    const newTransfert = await Transferts.create(req.body);
    res.status(201).json(newTransfert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all transfers
exports.getAlltransfer = async (req, res) => {
  try {
    const transferts = await Transferts.find({ centre: req.params.id });

    // Fetch product details for each transfer
    const transfersWithProductDetails = await Promise.all(
      transferts.map(async (transfer) => {
        // Fetch product details for the transfer
        const product = await Product.findOne({
          code: transfer.id_produit,
        }).select("name status price ");
        transfer.productDetails = product;

        return transfer;
      })
    );

    res.status(200).json(transfersWithProductDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific transfer by ID
exports.gettransfer = async (req, res) => {
  try {
    const transfert = await Transferts.findOne({ code: req.params.id });
    if (!transfert) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.status(200).json(transfert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific transfer by ID
exports.updatetransfer = async (req, res) => {
  try {
    const updatedTransfert = await Transferts.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTransfert) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.status(200).json(updatedTransfert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific transfer by ID
exports.deletetransfer = async (req, res) => {
  try {
    const deletedTransfert = await Transferts.findOneAndDelete({
      code: req.params.id,
    });
    if (!deletedTransfert) {
      return res.status(404).json({ message: "Transfer not found" });
    }
    res.status(200).json({ message: "Transfer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
