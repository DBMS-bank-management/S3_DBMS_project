const sql = require("./database");

// constructor
const Transaction = function (transaction) {
  this.trans_ID = transaction.trans_ID;
  this.amount = transaction.amount;
  this.mode_ID = transaction.mode_ID;
  this.acc_ID = transaction.acc_ID;
  this.description = transaction.description;
  this.timestamp = transaction.timestamp;
};

Transaction.create = (newTransaction, result) => {
  sql.query("INSERT INTO transaction SET ?", newTransaction, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created transaction: ", {
      id: res.insertId,
      ...newTransaction,
    });
    result(null, { id: res.insertId, ...newTransaction });
  });
};

Transaction.findById = (id, result) => {
  sql.query(
    "SELECT * FROM transaction WHERE trans_ID = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found transaction: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Transaction with the id
      result({ kind: "not_found" }, null);
    }
  );
};

//remove sql injection here
Transaction.getAll = (title, result) => {
  let query = "SELECT * FROM transaction ORDER BY timestamp DESC";

  if (title) {
    query += `WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Transaction: ", res);
    result(null, res);
  });
};

Transaction.updateById = (id, transaction, result) => {
  sql.query(
    "UPDATE transaction SET trans_ID= ?, amount = ?,mode_ID = ? , acc_ID = ? , description = ? WHERE trans_ID = ?",
    [
      transaction.trans_ID,
      transaction.amount,
      transaction.mode_ID,
      transaction.acc_ID,
      transaction.description,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Transaction with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated transaction: ", { id: id, ...transaction });
      result(null, { id: id, ...transaction });
    }
  );
};

Transaction.remove = (id, result) => {
  sql.query("DELETE FROM transaction WHERE trans_ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Transaction with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Transaction with id: ", id);
    result(null, res);
  });
};

Transaction.removeAll = (result) => {
  sql.query("DELETE FROM transaction", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} transaction`);
    result(null, res);
  });
};

Transaction.findTransactionsByUserId = (id, result) => {
  sql.query(
    "SELECT * from transaction t join account a on a.account_ID = t.acc_ID where customer_ID = ? ORDER BY timestamp DESC",
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

Transaction.addTransfer = (values, result) => {
  console.log({ values }, [
    values.fromAccount,
    values.toAccount,
    values.amount,
    "online",
  ]);
  sql.query(
    "call Transaction_Procedure(?, ? ,?, ? );",
    [values.fromAccount, values.toAccount, values.amount, "online"],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("transactions: ", res);
      result(null, res);
    }
  );
};

Transaction.addWithdrawal = (values, result) => {
  console.log({ values }, [values.fromAccount, values.amount]);
  sql.query(
    "call withdrawal(?, ? );",
    [values.fromAccount, values.amount],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("withdrawals: ", res);
      result(null, res);
    }
  );
};

Transaction.getWithdrawalCount = (account, result) => {
console.log({account})
  sql.query(
    "select count(*) as count from transaction where acc_ID=? and description='withdrawal' and month(timestamp)=month(now()) and year(timestamp)=year(now());",
    [account],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("withdrawals: ", res ? res[0] : 0);
      result(null, res ? res[0] : { count: null });
    }
  );
};

module.exports = Transaction;
