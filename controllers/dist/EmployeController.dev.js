"use strict";

var Employe = require("../models/Employe");

var Centre = require("../models/Centre"); // Create a new employé


exports.createEmploye = function _callee(req, res) {
  var employe;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          employe = new Employe(req.body);
          _context.next = 4;
          return regeneratorRuntime.awrap(employe.save());

        case 4:
          res.status(201).send(employe);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).send(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Get all employes with additional details


exports.getAllemploye = function _callee3(req, res) {
  var employes;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Employe.find({
            centre: req.params.id
          }));

        case 3:
          employes = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Promise.all(employes.map(function _callee2(employe) {
            var centre;
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    employe = employe.toObject(); // Convert Mongoose document to a plain JavaScript object
                    // Fetch client details

                    _context2.next = 3;
                    return regeneratorRuntime.awrap(Centre.findOne({
                      code: employe.centre
                    }).select("nom "));

                  case 3:
                    centre = _context2.sent;
                    employe.centreDetails = centre; // Add client details to employe

                    return _context2.abrupt("return", employe);

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          })));

        case 6:
          employes = _context3.sent;
          res.status(200).send(employes);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Read a Single Employé by ID


exports.getEmploye = function _callee4(req, res) {
  var employe;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Employe.findOne({
            code: req.params.id
          }));

        case 3:
          employe = _context4.sent;

          if (employe) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).send({
            message: "Employé not found"
          }));

        case 6:
          employe = employe.toObject(); // Convert Mongoose document to a plain JavaScript object

          res.send(employe);
          _context4.next = 14;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send(_context4.t0);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Update an Employé by ID


exports.updateEmploye = function _callee5(req, res) {
  var employe;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Employe.findOneAndUpdate({
            code: req.params.id
          }, req.body, {
            "new": true
          }));

        case 3:
          employe = _context5.sent;

          if (employe) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).send({
            message: "Employé not found"
          }));

        case 6:
          employe = employe.toObject(); // Convert Mongoose document to a plain JavaScript object

          res.send(employe);
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.status(500).send(_context5.t0);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Delete an Employé by ID


exports.deleteEmploye = function _callee6(req, res) {
  var employe;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Employe.findOneAndDelete({
            code: req.params.id
          }));

        case 3:
          employe = _context6.sent;

          if (employe) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.status(404).send({
            message: "Employé not found"
          }));

        case 6:
          res.send(employe);
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(500).send(_context6.t0);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
};