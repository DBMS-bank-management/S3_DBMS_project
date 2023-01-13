const sql = require("./database");

// constructor
const Installment = function (installment) {
  this.inst_ID = installment.inst_ID;
  this.loan_ID = installment.loan_ID;
  this.amount = installment.amount;
  this.due_date = installment.due_date;
  this.is_paid = installment.is_paid;
  this.trans_ID = installment.trans_ID;
};

Installment.create = (newInstallment, result) => {
  sql.query("INSERT INTO installment SET ?", newInstallment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created installment: ", {
      id: res.insertId,
      ...newInstallment,
    });
    result(null, { id: res.insertId, ...newInstallment });
  });
};

Installment.findById = (id, result) => {
  sql.query("SELECT * FROM installment WHERE inst_ID = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found installment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Installment with the id
    result({ kind: "not_found" }, null);
  });
};

//remove sql injection here
Installment.getAll = (title, result) => {
  let query = "SELECT * FROM installment";

  if (title) {
    query += `WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Installment: ", res);
    result(null, res);
  });
};

Installment.updateById = (id, installment, result) => {
  sql.query(
    "UPDATE installment SET inst_ID= ?, loan_ID = ?,amount = ? , due_date = ? , is_paid = ? WHERE trans_ID = ?",
    [
      installment.loan_ID,
      installment.amount,
      installment.due_date,
      installment.is_paid,
      installment.trans_ID,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Installment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated installment: ", { id: id, ...installment });
      result(null, { id: id, ...installment });
    }
  );
};

Installment.remove = (id, result) => {
  sql.query("DELETE FROM installment WHERE inst_ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Installment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Installment with id: ", id);
    result(null, res);
  });
};

Installment.removeAll = (result) => {
  sql.query("DELETE FROM installment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} installment`);
    result(null, res);
  });
};

Installment.getByCustomerID = (customer_ID, result) => {
  let query = "SELECT * FROM installment ORDER BY due_date";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("Installments by customer: ", res);
    result(null, res);
  });
};

Installment.payUsingAccount = (data, result) => {
  console.log({ data });
  sql.query(
    "call pay_installment_from_id(?, ? );",
    [data.installment, data.account],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Installments by customer: ", res);
      result(null, res);
    }
  );
};

Installment.payByCash = (data, result) => {
  console.log({ data });
  sql.query(
    "UPDATE installment SET is_paid = 1 WHERE inst_ID = ?",
    [data.inst_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Installments by customer: ", res);
      result(null, res);
    }
  );
};

module.exports = Installment;
