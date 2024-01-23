const express = require("express");
const router = express.Router();
const dashbordcontroller = require("../controllers/dashbordController");

// Route to get sales percentage by center
router.get("/dashbord/circle", dashbordcontroller.getcircle); // produit of stock on the circle
router.get("/dashbord/monhana", dashbordcontroller.getTotalPurchaseByMonth); // fi monhana
router.get("/dashbord/topproduct", dashbordcontroller.getTopProducts); // the top 10 produit plus vendue
router.get("/dashbord/recentlysale", dashbordcontroller.mostrecentlyvendu); // liste of recently use
router.get("/dashbord/profit/:id", dashbordcontroller.getprofit);

module.exports = router;
