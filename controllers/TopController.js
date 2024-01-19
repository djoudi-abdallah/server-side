const Sales = require("../models/Vente");
const Clients = require("../models/client");
const Products = require("../models/Produit");
const Transfers = require("../models/Transfer");
const Employe = require("../models/Employe");
const Fournisseur = require("../models/Fournisseur");

exports.getCentreOverview = async (req, res) => {
    try {
      const centreId = parseInt(req.params.id); // Assuming centre ID is passed as a route parameter
  
      // Ensure the centre ID matches the specified centre and is not 1
      const centreMatch = { $match: { centre: centreId } };
  
      // Aggregate top client
      const topClientResult = await Sales.aggregate([
        centreMatch,
        { $group: { _id: "$client", totalValue: { $sum: "$montantTotal" } } },
        { $sort: { totalValue: -1 } },
        { $limit: 1 }
      ]);
      console.log(topClientResult);
      const topClientId = topClientResult[0]?._id;
      const topClientDetails = topClientId ? await Clients.findOne({ code: topClientId }) : null;
  
      // Aggregate top product
      const topProductResult = await Sales.aggregate([
        centreMatch,
        { $group: { _id: "$produit", totalSold: { $sum: "$quantite" } } },
        { $sort: { totalSold: -1 } },
        { $limit: 1 }
      ]);
      const topProductId = topProductResult[0]?._id;
      const topProductDetails = topProductId ? await Products.findOne({ code: topProductId }) : null;
  
      const topEmployeeResult = await Employe.aggregate([
        centreMatch,
        { $group: { _id: null, highestSalary: { $max: "$salaire" } } }
      ]);
      const topEmployeeDetails = topEmployeeResult[0]?.highestSalary
        ? await Employe.findOne({ centre: centreId, salaire: topEmployeeResult[0].highestSalary })
        : null;
  
      // Calculate profit
      const totalSalesResult = await Sales.aggregate([
        centreMatch,
        { $group: { _id: null, totalAmount: { $sum: "$montantTotal" } } }
      ]);
      const totalTransfersResult = await Transfers.aggregate([
        centreMatch,
        { $group: { _id: null, totalAmount: { $sum: "$coutEquivalent" } } }
      ]);
  
      const totalSales = totalSalesResult[0]?.totalAmount || 0;
      const totalTransfers = totalTransfersResult[0]?.totalAmount || 0;
      const profit = totalSales - totalTransfers;
  
      res.status(200).json({
        topClient: topClientDetails,
        topProduct: topProductDetails,
        topEmployee: topEmployeeDetails, 
        profit,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };
  

exports.getCentreOverviewForCentre1 = async (req, res) => {
  try {
    const centreFilter = { centre: 3 };

    // Top Client
    const topClientResult = await Sales.aggregate([
      { $match: centreFilter },
      { $group: { _id: "$client", totalSales: { $sum: "$montantTotal" } } },
      { $sort: { totalSales: -1 } },
      { $limit: 1 },
    ]);
    const topClientId = topClientResult[0]?._id;
    const topClientDetails = topClientId
      ? await Clients.findOne({ _id: topClientId })
      : null;

    // Top Supplier (Fournisseur)
    const topSupplierResult = await Achats.aggregate([
      { $match: centreFilter },
      {
        $group: {
          _id: "$id_fournisseur",
          totalPurchaseValue: { $sum: "$montantTotal" },
        },
      },
      { $sort: { totalPurchaseValue: -1 } },
      { $limit: 1 },
    ]);
    const topSupplierId = topSupplierResult[0]?._id;
    const topSupplierDetails = topSupplierId
      ? await Fournisseur.findOne({ code: topSupplierId })
      : null;

    const topEmployeeResult = await Employe.aggregate([
      { $match: centreFilter },
      { $group: { _id: null, highestSalary: { $max: "$salaire" } } },
    ]);

    // Find the employee details with the highest salary
    let topEmployeeDetails = null;
    if (topEmployeeResult.length > 0 && topEmployeeResult[0].highestSalary) {
      topEmployeeDetails = await Employe.findOne({
        centre: 3,
        salaire: topEmployeeResult[0].highestSalary,
      });
    }
    // Top Product
    const topProductResult = await Sales.aggregate([
      { $match: centreFilter },
      { $group: { _id: "$produit", totalQuantity: { $sum: "$quantite" } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
    ]);
    const topProductId = topProductResult[0]?._id;
    const topProductDetails = topProductId
      ? await Products.findOne({ code: topProductId })
      : null;

    res.status(200).json({
      topClient: topClientDetails,
      topSupplier: topSupplierDetails,
      topEmployee: topEmployeeDetails,
      topProduct: topProductDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getTopSalesDetails = async (req, res) => {
  try {
    // Exclude centre with code 1 and Aggregate top client based on sales amount
    const topClient = await Ventes.aggregate([
      { $match: { centre: { $ne: 1 } } },
      { $group: { _id: "$client", totalSales: { $sum: "$montantTotal" } } },
      { $sort: { totalSales: -1 } },
      { $limit: 1 },
    ]);

    // If there's a top client, fetch their details
    let topClientDetails = {};
    if (topClient.length > 0) {
      topClientDetails = await Clients.findOne({ code: topClient[0]._id });
    }

    // Exclude centre with code 1 and Aggregate top product based on sales quantity
    const topProduct = await Ventes.aggregate([
      { $match: { centre: { $ne: 1 } } },
      { $group: { _id: "$produit", totalQuantity: { $sum: "$quantite" } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
    ]);

    // If there's a top product, fetch its details
    let topProductDetails = {};
    if (topProduct.length > 0) {
      topProductDetails = await Products.findOne({ code: topProduct[0]._id });
    }

    res.status(200).json({
      topClient: topClientDetails,
      topProduct: topProductDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
