const ReportModel = require("../models/reportModel");

exports.lateInstallmentsReport = (req, res) => {
  const branch_ID = req.user.employee.branch_ID;
  ReportModel.lateInstallmentsReport(branch_ID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving data.",
      });
    else res.send(data);
  });
};

exports.totalTransactionReport = (req, res) => {
  const branch_ID = req.user.employee.branch_ID;
  ReportModel.totalTransactionReport(branch_ID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving data.",
      });
    else res.send(data);
  });
};
