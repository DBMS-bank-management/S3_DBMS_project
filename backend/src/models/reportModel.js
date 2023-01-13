const sql = require("./database");

// constructor
const Report = function () {
  this.id = "report";
};

Report.lateInstallmentsReport = (branch_ID, result) => {
  sql.query(
    "SELECT * from late_installments where branch_ID = ? ;",
    [branch_ID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

Report.totalTransactionReport = (branch_ID, result) => {
  sql.query(
    "Select * from tot_transactions where branch_ID = ?",
    [branch_ID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

module.exports = Report;
