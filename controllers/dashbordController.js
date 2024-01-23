const Vente = require("../models/Vente");
const achat = require("../models/Achats");
const Produit = require("../models/Produit");
const Client = require("../models/client");
const Transferts = require("../models/Transfer");

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

    // Initialize an array of 12 zeros (one for each month)
    let monthlyPurchases = new Array(12).fill(0);

    // Update the array with actual sales data
    salesData.forEach((item) => {
      const month = parseInt(item._id.split("-")[1]) - 1; // Extract month (0-11)
      monthlyPurchases[month] = item.totalPurchase;
    });

    res.json(monthlyPurchases);
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

exports.getprofit = async (req, res) => {
  try {
    const centreId = parseInt(req.params.id);
    const currentYear = new Date().getFullYear();

    if (isNaN(centreId)) {
      return res.status(400).send("Invalid Centre ID");
    }

    // Filter and Aggregate total sales for the specified centre for each month of the current year
    const salesResult = await Vente.aggregate([
      { 
        $match: { 
          centre: centreId,
          dateVente: { 
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        } 
      },
      { 
        $group: {
          _id: { $month: "$dateVente" },
          totalSales: { $sum: "$montantTotal" }
        }
      },
    ]);

    // Filter and Aggregate total transfer costs for the specified centre for each month of the current year
    const transferResult = await Transferts.aggregate([
      { 
        $match: { 
          centre: centreId,
          dateTransfert: { 
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          } 
        } 
      },
      { 
        $group: {
          _id: { $month: "$dateTransfert" },
          totalTransferCost: { $sum: "$coutEquivalent" }
        }
      },
    ]);

    // Initialize an array for each month of the year
    let monthlyProfits = new Array(12).fill(0);

    // Add sales to the profits
    salesResult.forEach((sale) => {
      monthlyProfits[sale._id - 1] += sale.totalSales;
    });

    // Subtract transfer costs from the profits
    transferResult.forEach((transfer) => {
      monthlyProfits[transfer._id - 1] -= transfer.totalTransferCost;
    });

    res.status(200).json(monthlyProfits);
  } catch (error) {
    console.error("Error calculating monthly profit for centre:", error);
    res.status(500).send("Internal Server Error");
  }
};


