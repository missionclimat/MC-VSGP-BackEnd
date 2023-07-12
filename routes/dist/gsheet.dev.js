"use strict";

var getSimulatorResults = require("../public/javascripts/getSimulatorResults.js");

var express = require("express");

var router = new express.Router();

var fs = require("fs");

var readline = require("readline");

var _require = require("googleapis"),
    google = _require.google;

require("dotenv").config();

router.get("/download/:id", function (req, res, next) {
  var idSheet = req.params.id;

  function main() {
    var auth, drive, dest;
    return regeneratorRuntime.async(function main$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            auth = new google.auth.GoogleAuth({
              // Scopes can be specified either as an array or as a single, space-delimited string.
              scopes: ["https://www.googleapis.com/auth/drive"]
            });
            drive = google.drive({
              version: "v3",
              auth: auth
            });
            dest = fs.createWriteStream("../../../../../Ironhack");
            drive.files["export"]({
              fileId: idSheet,
              mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }).then(function (response) {
              res.status(200).json({
                results: response
              });
            })["catch"](function (err) {
              return console.log(err);
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  main()["catch"](res.status(500));
}); // //route permettant de récupérer les valeurs des paramètres d'une spreadsheet déjà créée
//   router.get("/values/:id", (req, res, next) => {
//     // If modifying these scopes, delete token.json.
//   const SCOPES = ['https://www.googleapis.com/auth/drive'];
//     function formatNumber(number, isPercent) {
//       var numberFormated = Number(number.replace(",", "."))
//       isPercent == 1 ? numberFormated *= 100 : "kikou"
//       return numberFormated
//     }
//     async function main () {
//         // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
//         // environment variables.
//         const auth = new google.auth.GoogleAuth({
//           // Scopes can be specified either as an array or as a single, space-delimited string.
//           scopes: ['https://www.googleapis.com/auth/drive']
//         });
//         const idSheet=req.params.id
//         const rangeParams = 'Paramètres!F3:J37'
//         const sheets = google.sheets({version: 'v4', auth});
//         sheets.spreadsheets.values
//         .get({
//             spreadsheetId: idSheet,
//             range: rangeParams,
//         })
//         .then(response => {
//             var rows=response.data.values
//             var values = []
//             rows.forEach(row => {
//             !isNaN(Number(row[4].replace(",","."))) ? values.push([formatNumber(row[4],row[0]==="%")]) : values.push([row[4]])
//             })
//             res.status(200).json({ values: values})
//         })
//         .catch(res.status(500))
//     }
//     main().catch(res.status(500))
//   })
//copie de la spreadsheet master. Renvoie l'ID de la copie

router.get("/", function (req, res, next) {
  function main() {
    var auth, drive;
    return regeneratorRuntime.async(function main$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            auth = new google.auth.GoogleAuth({
              // Scopes can be specified either as an array or as a single, space-delimited string.
              scopes: ["https://www.googleapis.com/auth/drive"]
            });
            drive = google.drive({
              version: "v3",
              auth: auth
            });
            drive.files.copy({
              fileId: process.env.SPREADSHEET_MASTER_ID
            }).then(function (dbRes) {
              drive.permissions.create({
                fileId: dbRes.data.id,
                resource: {
                  role: 'writer',
                  type: 'anyone'
                }
              }).then(function (permRes) {
                res.status(200).json({
                  id: dbRes.data.id
                });
              })["catch"](res.status(500));
            })["catch"](res.status(500));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  main()["catch"](res.status(500));
}); //route permettant de récupérer les valeurs des paramètres d'une spreadsheet déjà créée

router.get("/values/:id", function (req, res, next) {
  // If modifying these scopes, delete token.json.
  var SCOPES = ["https://www.googleapis.com/auth/drive"];

  function formatNumber(number, isPercent) {
    var numberFormated = Number(number.replace(",", "."));
    isPercent == 1 ? numberFormated *= 100 : "kikou";
    return numberFormated;
  }

  function main() {
    var auth, idSheet, rangeParams, sheets;
    return regeneratorRuntime.async(function main$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
            // environment variables.
            auth = new google.auth.GoogleAuth({
              // Scopes can be specified either as an array or as a single, space-delimited string.
              scopes: ["https://www.googleapis.com/auth/drive"]
            });
            idSheet = req.params.id;
            rangeParams = "Paramètres!F3:J28";
            sheets = google.sheets({
              version: "v4",
              auth: auth
            });
            sheets.spreadsheets.values.get({
              spreadsheetId: idSheet,
              range: rangeParams
            }).then(function (response) {
              var rows = response.data.values;
              var values = [];
              rows.forEach(function (row) {
                !isNaN(Number(row[4].replace(",", "."))) ? values.push([formatNumber(row[4], row[0] === "%")]) : values.push([row[4]]);
              });
              res.status(200).json({
                values: values
              });
            })["catch"](res.status(500));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  main()["catch"](res.status(500));
}); //actualisation de la sheet avec de nouveaux paramètres et renvoi des résultats correspondants

router.patch("/update/:id", function (req, res, next) {
  var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

  function main() {
    var auth, idSheet, values, rangeParams, rangeOutputs, sheets;
    return regeneratorRuntime.async(function main$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
            // environment variables.
            auth = new google.auth.GoogleAuth({
              scopes: SCOPES
            });
            idSheet = req.params.id;
            values = req.body.values;
            rangeParams = "Paramètres!J3:J28";
            rangeOutputs = "Résultats!A1:BB300";
            sheets = google.sheets({
              version: "v4",
              auth: auth
            });
            sheets.spreadsheets.values.update({
              spreadsheetId: idSheet,
              range: rangeParams,
              valueInputOption: "RAW",
              "resource": {
                "values": values
              }
            }).then(function (response) {
              sheets.spreadsheets.values.get({
                spreadsheetId: idSheet,
                range: rangeOutputs
              }).then(function (response) {
                var rows = response.data.values;
                var results = getSimulatorResults(rows);
                res.status(200).json({
                  results: results
                });
              })["catch"](res.status(500));
            })["catch"](res.status(500));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    });
  }

  main()["catch"](res.status(500));
}); //actualisation de la sheet avec de nouveaux paramètres et c'est tout (utile pour la réinite)

router.patch("/updateonly/:id", function (req, res, next) {
  var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

  function main() {
    var auth, idSheet, values, rangeParams, sheets;
    return regeneratorRuntime.async(function main$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
            // environment variables.
            auth = new google.auth.GoogleAuth({
              scopes: SCOPES
            });
            idSheet = req.params.id;
            values = req.body.values;
            rangeParams = "Paramètres!J3:J28";
            sheets = google.sheets({
              version: "v4",
              auth: auth
            });
            sheets.spreadsheets.values.update({
              spreadsheetId: idSheet,
              range: rangeParams,
              valueInputOption: "RAW",
              "resource": {
                "values": values
              }
            }).then(function (response) {
              res.status(200).json({
                response: "done"
              });
            })["catch"](res.status(500));

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    });
  }

  main()["catch"](res.status(500));
});
router["delete"]("/delete/:id", function (req, res, next) {
  var idFile = req.params.id;
  var SCOPES = ["https://www.googleapis.com/auth/drive"];

  function main() {
    var auth, drive;
    return regeneratorRuntime.async(function main$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            // This method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
            // environment variables.
            auth = new google.auth.GoogleAuth({
              scopes: SCOPES
            });
            drive = google.drive({
              version: "v3",
              auth: auth
            });
            drive.files["delete"]({
              fileId: idFile
            }).then(function (dbRes) {
              res.status(200).json({
                data: "File " + idFile + " deleted"
              });
            })["catch"](function (err) {
              res.status(500);
            });

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    });
  }

  main()["catch"](res.status(500));
});
module.exports = router;