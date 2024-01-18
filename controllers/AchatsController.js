const Achat = require("../models/Achats");
const Fournisseur = require("../models/Fournisseur");
const Product = require("../models/Produit");
const ProduitStock = require("../models/produitStock");
const Centre = require("../models/Centre");

exports.createAchat = async (req, res) => {
  const {
    id_fournisseur,
    id_produit,
    quantite,
    statutPaiement,
    soldeRestant,
    centre,
  } = req.body;
  console.log(centre);
  try {
    // Check if the Fournisseur exists
    const fournisseurExists = await Fournisseur.findOne({
      code: id_fournisseur,
    });
    if (!fournisseurExists) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }
    // check if the centre exicte
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
    if (statutPaiement === "Partiellement payé") {
      fournisseurExists.solde += soldeRestant;
    }
    // Create the Achat
    const newAchat = new Achat(req.body);
    await newAchat.save();

    // Update or create a new entry in ProduitStock
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
    if (!statutPaiement) {
      const fournisseur = await Fournisseur.findOne({
        code: id_fournisseur,
      });

      if (fournisseur) {
        fournisseur.solde += newAchat.montantTotalHT;

        await fournisseur.save();
      } else {
        throw new Error("Fournisseur not found");
      }
      newAchat.reste = newAchat.montantTotalHT;
      await newAchat.save();
    }
    res.status(201).send({
      message: "Achat created and stock updated successfully",
      data: newAchat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Get a single achat by ID
exports.getAchat = async (req, res) => {
  try {
    const achat = await Achat.findOne({ code: req.params.id });
    if (!achat) {
      return res.status(404).send({ message: "Achat not found" });
    }
    res.status(200).send(achat);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all achats
exports.getAllAchats = async (req, res) => {
  try {
    let achats = await Achat.find();
    achats = await Promise.all(
      achats.map(async (achat) => {
        achat = achat.toObject(); // Convert Mongoose document to a plain JavaScript object

        // Fetch fournisseur details
        const fournisseur = await Fournisseur.findOne({
          code: achat.id_fournisseur,
        }).select("nom prenom"); // Adjust the field name as per your Fournisseur model
        achat.fournisseurDetails = fournisseur; // Add fournisseur details to achat

        // Fetch product details
        const product = await Product.findOne({
          code: achat.id_produit,
        }).select("name"); // Replace 'productId' and 'name' with actual field names in your Product model
        achat.productDetails = product; // Add product details to achat

        return achat;
      })
    );

    res.status(200).send(achats);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Update an achat by ID
exports.updateAchat = async (req, res) => {
  try {
    // Find the existing Achat
    const existingAchat = await Achat.findOne({ code: req.params.id });
    if (!existingAchat) {
      return res.status(404).send({ message: "Achat not found" });
    }

    const oldQuantiteAchat = existingAchat.quantite;

    // Update the Achat
    const updatedAchat = await Achat.findOneAndUpdate(
      { code: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedAchat) {
      return res.status(404).send({ message: "Achat not found" });
    }

    const newQuantiteAchat = updatedAchat.quantite;

    // Adjust the stock if the quantity purchased has changed
    if (oldQuantiteAchat !== newQuantiteAchat) {
      const stockelement = await ProduitStock.findOne({
        code: updatedAchat.id_produit,
      });
      if (stockItem) {
        // Adjust the stock based on the difference in quantities
        stockelement.quantite -= newQuantiteAchat - oldQuantiteAchat;
        await stockelement.save();
      }
    }

    res
      .status(200)
      .send({ message: "Achat updated successfully", data: updatedAchat });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete an achat by ID
exports.deleteAchat = async (req, res) => {
  try {
    // Retrieve the achat to get its details before deletion
    const achat = await Achat.findOneAndDelete({ code: req.params.id });
    if (!achat) {
      return res.status(404).send({ message: "Achat not found" });
    }

    // Store the quantity purchased and product ID before deleting the achat
    const { quantite, id_produit } = achat;

    // Delete the achat

    // Update the stock
    const stockelement = await ProduitStock.findOne({ id_produit });
    if (stockelement) {
      stockelement.quantite += quantite; // Add back the quantity to the stock
      await stockelement.save();
    }

    res.status(200).send({ message: "Achat deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
