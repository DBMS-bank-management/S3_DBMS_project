const sql = require("./database");

// constructor
const NormalApplication = function (normalApplication) {
  // this.app_ID = normalApplication.app_ID;
  this.branch_ID = normalApplication.branch_ID;
  this.acc_ID = normalApplication.acc_ID;
  this.amount = normalApplication.amount;
  this.is_approved = null;
  // this.app_date=normalApplication.app_date;
  // this.loan_ID=normalApplication.loan_ID;
};

NormalApplication.create = (newNormalApplication, result) => {
  sql.query(
    "INSERT INTO normal_application SET ?",
    newNormalApplication,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created normal application: ", {
        id: res.insertId,
        ...newNormalApplication,
      });
      result(null, { id: res.insertId, ...newNormalApplication });
    }
  );
};

NormalApplication.findById = (id, result) => {
  sql.query(
    "SELECT * FROM normal_application WHERE app_ID = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Normal Application with the id
      result({ kind: "not_found" }, null);
    }
  );
};

//remove sql injection here
NormalApplication.getAll = (name, result) => {
  let query = "SELECT * FROM normal_application ORDER BY app_ID DESC";

  // if (name) {
  //   query += `WHERE title LIKE '%${name}%'`;
  // }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("normalApplications: ", res);
    result(null, res);
  });
};

NormalApplication.updateById = (id, normalApplication, result) => {
  sql.query(
    "UPDATE normal_application SET branch_ID = ?, acc_ID = ?, amount = ?, is_approved = ?,app_date = ?, loan_ID = ? WHERE app_ID = ?",
    [
      normalApplication.branch_ID,
      normalApplication.acc_ID,
      normalApplication.amount,
      normalApplication.is_approved,
      normalApplication.app_date,
      normalApplication.loan_ID,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Normal Application with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated normal application: ", {
        id: id,
        ...normalApplication,
      });
      result(null, { id: id, ...normalApplication });
    }
  );
};

NormalApplication.remove = (id, result) => {
  sql.query(
    "DELETE FROM normal_application WHERE app_ID = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Normal Application with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted normal application with id: ", id);
      result(null, res);
    }
  );
};

NormalApplication.removeAll = (result) => {
  sql.query("DELETE FROM normal_application", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} normal applications`);
    result(null, res);
  });
};

NormalApplication.approve = (application_id, result) => {
  sql.query(
    "call approve_normal_application(?);",
    application_id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`Eligible for taking the loan`);
      result(null, res);
    }
  );
};

NormalApplication.decline = (application_id, result) => {
  sql.query(
    "UPDATE normal_application SET is_approved = 0 WHERE app_ID = ?",
    application_id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`Declined normal application`);
      result(null, res);
    }
  );
};

module.exports = NormalApplication;
