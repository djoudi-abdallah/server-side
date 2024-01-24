const Transferts = require("../models/Transfer");
const Product = require("../models/Produit");
const Centre = require("../models/Centre");
const ProduitStock = require("../models/produitStock");
const Achats = require("../models/Achats");
// Create a new transfer
exports.createTrasnsfer = async (req, res) => {
  const { centre, id_produit, quantite } = req.body;
  let coutEquivalent = 0;
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

    const achatsDetails = await Achats.findOne({ id_produit: id_produit });

    console.log("achatsDetails:", achatsDetails); // Debugging log

    if (achatsDetails && achatsDetails.prixUnitaireHT) {
      coutEquivalent = quantite * achatsDetails.prixUnitaireHT;
    }

    const produitStockmain = await ProduitStock.findOne({
      id_produit: id_produit,
      centre: 1,
    });
    if (produitStockmain) {
      produitStockmain.quantite -= quantite;
      await produitStockmain.save();
    }

    const ProduitStockEntry = await ProduitStock.findOne({
      produit: id_produit,
      centre: centre,
    });
    if (ProduitStockEntry) {
      ProduitStockEntry.quantite += quantite;
      await ProduitStockEntry.save();
    }

    await ProduitStockEntry.save();

    const response = {
      ...req.body,
      coutEquivalent: coutEquivalent, // assuming this line is correct
    };

    const newTransfert = await Transferts.create(response);
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
        }).select("name status price");

        // Clone the transfer object and add productDetails
        const transferWithDetails = transfer.toObject
          ? transfer.toObject()
          : { ...transfer._doc };
        transferWithDetails.productDetails = product;

        return transferWithDetails;
      })
    );

    res.status(200).json(transfersWithProductDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all transfers from all centers
exports.getAllTransfers1 = async (req, res) => {
  try {
    // Fetch all transfers from the Transferts collection
    const transfers = await Transferts.find();

    // Fetch product details for each transfer
    const transfersWithProductDetails = await Promise.all(
      transfers.map(async (transfer) => {
        // Fetch product details for the transfer
        const product = await Product.findOne({
          code: transfer.id_produit,
        }).select("name status price");

        // Clone the transfer object and add productDetails
        const transferWithDetails = transfer.toObject
          ? transfer.toObject()
          : { ...transfer._doc };
        transferWithDetails.productDetails = product;

        return transferWithDetails;
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
    // Find the existing transfer document to get the product ID
    const existingTransfer = await Transferts.findOne({ code: req.params.id });

    if (!existingTransfer) {
      return res.status(404).json({ message: "Transfer not found" });
    }

    // Update the transfer document with the new data
    const updatedTransfert = await Transferts.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );

    // Calculate the updated coutEquivalent based on the new quantite
    const achatsDetails = await Achats.findOne({
      id_produit: existingTransfer.id_produit,
    });
    if (achatsDetails && achatsDetails.prixUnitaireHT) {
      updatedTransfert.coutEquivalent =
        updatedTransfert.quantite * achatsDetails.prixUnitaireHT;
    } else {
      // Handle the case where achatsDetails or prixUnitaireHT is missing
      updatedTransfert.coutEquivalent = 0; // You can set it to a default value or handle it as needed
    }

    // Save the updated transfer document with the recalculated coutEquivalent
    await updatedTransfert.save();

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
