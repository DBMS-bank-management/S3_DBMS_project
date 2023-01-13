const sql = require("./database");

// constructor
const Loan = function (loan) {
  this.loan_ID = loan.loan_ID;
  this.acc_ID = loan.acc_ID;
  this.amount = loan.amount;
  this.plan_id = loan.plan_id;
};

Loan.create = (newLoan, result) => {
  sql.query("INSERT INTO loan SET ?", newLoan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created loan: ", { id: res.insertId, ...newLoan });
    result(null, { id: res.insertId, ...newLoan });
  });
};

Loan.findById = (id, result) => {
  sql.query("SELECT * FROM loan WHERE loan_ID = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found loan: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Loan with the id
    result({ kind: "not_found" }, null);
  });
};

//remove sql injection here
Loan.getAll = (title, result) => {
  let query = "SELECT * FROM loan";

  if (title) {
    query += `WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Loan: ", res);
    result(null, res);
  });
};

Loan.updateById = (id, loan, result) => {
  sql.query(
    "UPDATE loan SET loan_ID= ?, acc_ID = ?,amount = ?  WHERE plan_id = ?",
    [loan.acc_ID, loan.amount, loan.plan_ID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Loan with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated loan: ", { id: id, ...loan });
      result(null, { id: id, ...loan });
    }
  );
};

Loan.remove = (id, result) => {
  sql.query("DELETE FROM loan WHERE loan_ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Loan with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted loan with id: ", id);
    result(null, res);
  });
};

Loan.removeAll = (result) => {
  sql.query("DELETE FROM loan", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} loan`);
    result(null, res);
  });
};

Loan.findLoansByUserId = (id, result) => {
  sql.query(
    "select * from loan where acc_ID in (select account_ID from account where customer_ID=?) ORDER by loan_ID DESC;",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      // console.log("transactions: ", res);
      result(null, res);
    }
  );
};

module.exports = Loan;
