"use strict";

var Transferts = require("../models/Transfer");

var Product = require("../models/Produit");

var centre = require("../models/Centre"); // Create a new transfer


exports.createTrasnsfer = function _callee(req, res) {
  var _req$body, centreID, produit, centreExists, productExists, newTransfert;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, centreID = _req$body.centreID, produit = _req$body.produit;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(centre.findOne({
            code: centreID
          }));

        case 4:
          centreExists = _context.sent;

          if (centreExists) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).send({
            message: "centre not found"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Product.findOne({
            code: produit
          }));

        case 9:
          productExists = _context.sent;

          if (productExists) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(404).send({
            message: "Product not found"
          }));

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(Transferts.create(req.body));

        case 14:
          newTransfert = _context.sent;
          res.status(201).json(newTransfert);
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            error: _context.t0.message
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
}; // Get all transfers


exports.getAlltransfer = function _callee2(req, res) {
  var transferts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Transferts.find({
            centre: req.params.id
          }));

        case 3:
          transferts = _context2.sent;
          res.status(200).json(transferts);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get a specific transfer by ID


exports.gettransfer = function _callee3(req, res) {
  var transfert;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Transferts.findOne({
            code: req.params.id
          }));

        case 3:
          transfert = _context3.sent;

          if (transfert) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Transfer not found"
          }));

        case 6:
          res.status(200).json(transfert);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            error: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Update a specific transfer by ID


exports.updatetransfer = function _callee4(req, res) {
  var updatedTransfert;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Transferts.findOneAndUpdate({
            code: req.params.id
          }, req.body, {
            "new": true
          }));

        case 3:
          updatedTransfert = _context4.sent;

          if (updatedTransfert) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Transfer not found"
          }));

        case 6:
          res.status(200).json(updatedTransfert);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // Delete a specific transfer by ID


exports.deletetransfer = function _callee5(req, res) {
  var deletedTransfert;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Transferts.findOneAndDelete({
            code: req.params.id
          }));

        case 3:
          deletedTransfert = _context5.sent;

          if (deletedTransfert) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Transfer not found"
          }));

        case 6:
          res.status(200).json({
            message: "Transfer deleted successfully"
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: _context5.t0.message
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};