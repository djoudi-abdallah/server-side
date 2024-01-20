const Vente = require("../models/Vente"); // Replace with your actual Vente model

// Route to get sales percentage by center
exports.getcircle = async (req, res) => {
  try {
    // Aggregate sales data
    const salesData = await Vente.aggregate([
      {
        $group: {
          _id: "$centreCode", // Group by centreCode
          totalSales: { $sum: "$montantTotal" }, // Replace 'amount' with your field for sales amount
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
