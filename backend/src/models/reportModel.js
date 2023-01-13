const sql = require("./database");

// constructor
const Report = function () {
  this.id = "report";
};

Report.lateInstallmentsReport = (branch_ID, result) => {
  sql.query("INSERT INTO trans_mode SET ?", ["replace"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transmode: ", { id: res.insertId, ...newTransmode });
    result(null, { id: res.insertId, ...newTransmode });
  });
};

Report.totalTransactionReport = (branch_ID, result) => {
  sql.query("INSERT INTO trans_mode SET ?", ["replace"], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transmode: ", { id: res.insertId, ...newTransmode });
    result(null, { id: res.insertId, ...newTransmode });
  });
};

module.exports = Report;
