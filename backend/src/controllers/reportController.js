const ReportModel = require("../models/reportModel");

exports.lateInstallmentsReport = (req, res) => {
    const title = req.query.title;
    console.log("Entered");
    ReportModel.lateInstallmentsReport(title, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving transactionmodes.",
        });
      else res.send(data);
    });
  };



  exports.totalTransactionReport = (req, res) => {
    const title = req.query.title;
    console.log("Entered");
    ReportModel.totalTransactionReport(title, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving transactionmodes.",
        });
      else res.send(data);
    });
  };

