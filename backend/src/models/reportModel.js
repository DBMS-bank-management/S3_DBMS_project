const sql = require("./database");

// constructor
const Report = function () {
  this.id = "report";
};

Report.lateInstallmentsReport = (branch_ID, result) => {
  sql.query(
    "SELECT * from pending_installments where branch_ID = 'COL02';",
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
  sql.query("INSERT INTO trans_mode SET ?", ["replace"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Report;
