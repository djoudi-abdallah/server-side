const Achat = require("../models/Achats");
const Fournisseur = require("../models/Fournisseur");
const Product = require("../models/Produit");
const ProduitStock = require("../models/produitStock");

exports.createAchat = async (req, res) => {
  const {
    id_fournisseur,
    produit,
    quantite,
    statusPaiement,
    prixUnitaireHT,
    montantVerse,
  } = req.body;
  try {
    // Check if the Fournisseur exists
    const fournisseurExists = await Fournisseur.findOne({
      code: id_fournisseur,
    });
    if (!fournisseurExists) {
      return res.status(404).send({ message: "Fournisseur not found" });
    }
    // Check if the Product exists
    const productExists = await Product.findOne({ name: produit });

    if (productExists) {
      const produitStockExists = await ProduitStock.findOne({
        produit: productExists.code,
        centre: 1,
      });
      // Update in ProduitStock
      if (produitStockExists) {
        produitStockExists.quantite += quantite;
        await produitStockExists.save();
      } else {
        // Create a new produit stock entry for the existing product
        const newProduitStock = new ProduitStock({
          produit: productExists.code,
          centre: 1,
          quantite: quantite,
        });
        await newProduitStock.save();
      }
    } else {
      // Create a new product
      const newProduct = new Product({
        name: produit,
        price: prixUnitaireHT,
      });
      await newProduct.save();

      // Create a new produit stock entry for the new product
      const newProduitStock = new ProduitStock({
        produit: newProduct.code,
        centre: 1,
        quantite: quantite,
      });
      await newProduitStock.save();
    }

    // Create the Achat
    const newAchat = new Achat({
      id_fournisseur,
      quantite,
      statusPaiement,
      prixUnitaireHT,
      fournisseurname: fournisseurExists.nom,
      fournisseurprenom: fournisseurExists.prenom,
      produitname: produit,
      montantVerse: montantVerse,
    });

    // Calculate soldeRestant based on statusPaiement

    if (statusPaiement === "Partiellement payé") {
      let soldeRestant = 0;
      const calculatedValue = newAchat.montantTotalHT - montantVerse;
      if (!isNaN(calculatedValue)) {
        soldeRestant = calculatedValue;
      } else {
        // Handle error or set a default value for soldeRestant
        soldeRestant = 0; // or any appropriate handling
      }

      fournisseurExists.solde += soldeRestant;
      newAchat.soldeRestant = soldeRestant;
      await fournisseurExists.save();
      await newAchat.save();
    }

    // Save newAchat after soldeRestant calculation

    if (statusPaiement === "Non payé") {
      fournisseurExists.solde += newAchat.montantTotalHT;
      await fournisseurExists.save();
      newAchat.soldeRestant = newAchat.montantTotalHT;
      await fournisseurExists.save();
      await newAchat.save();
    } else {
      fournisseurExists.solde = 0;
    }

    res.status(201).send({
      message: "Achat created and stock updated successfully",
      data: newAchat,
    });
  } catch (error) {
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

        return achat;
      })
    );
    // await Achat.deleteMany({})
    res.status(200).send(achats);
  } catch (error) {
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
