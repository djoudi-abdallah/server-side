const Vente = require("../models/Vente");
const achat = require("../models/Achats");
const Produit = require("../models/Produit");
const Client = require("../models/client");

exports.getcircle = async (req, res) => {
  try {
    // Aggregate sales data
    const salesData = await Vente.aggregate([
      {
        $group: {
          _id: "$centre", // Group by the "centre" field in your Vente schema
          totalSales: { $sum: "$montantTotal" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalSales" },
          centers: {
            $push: {
              centreCode: "$_id",
              totalSales: "$totalSales",
            },
          },
        },
      },
      {
        $unwind: "$centers",
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the result
          centreCode: "$centers.centreCode",
          totalSales: "$centers.totalSales",
          percentage: {
            $multiply: [{ $divide: ["$centers.totalSales", "$total"] }, 100],
          },
        },
      },
    ]);

    res.json(salesData);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Route to get total purchase amount for "Centre 1" by month
exports.getTotalPurchaseByMonth = async (req, res) => {
  try {
    // Aggregate sales data for "Centre 1"
    const salesData = await achat.aggregate([
      {
        $match: {
          centre: 1, // Filter by "Centre 1"
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m", // Group by year and month
              date: "$dateAchat", // Use the sale date for grouping
            },
          },
          totalPurchase: { $sum: "$montantTotalHT" }, // Calculate total purchase amount
        },
      },
      {
        $sort: {
          _id: 1, // Sort by month in ascending order
        },
      },
    ]);

    res.json(salesData);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    // Aggregate sales data
    const topProducts = await Vente.aggregate([
      {
        $group: {
          _id: "$produit", // Group by product
          totalSales: { $sum: "$montantTotal" }, // Calculate total sales for each product
        },
      },
      {
        $sort: {
          totalSales: -1, // Sort in descending order based on total sales
        },
      },
      {
        $limit: 10, // Limit to the top 10 products
      },
      {
        $lookup: {
          from: "produits", // Replace with the actual name of your Product collection
          localField: "_id",
          foreignField: "code",
          as: "productDetails",
        },
      },
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.mostrecentlyvendu = async (req, res) => {
  try {
    // Récupération des ventes récentes
    const recentSales = await Vente.find({ centre: 1 })
      .sort({ dateVente: -1 })
      .limit(10);

    // Préparation des promesses pour récupérer les détails des produits et des clients
    const produitPromises = recentSales.map((vente) =>
      Produit.findOne({ code: vente.produit }).select("name")
    );
    const clientPromises = recentSales.map((vente) =>
      Client.findOne({ code: vente.client }).select("nom")
    );

    // Résolution des promesses
    const produitsDetails = await Promise.all(produitPromises);
    const clientsDetails = await Promise.all(clientPromises);

    // Attacher les détails aux ventes correspondantes
    const enrichedSales = recentSales.map((vente, index) => ({
      ...vente.toObject(),
      produitDetails: produitsDetails[index],
      clientDetails: clientsDetails[index],
    }));

    res.json(enrichedSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
