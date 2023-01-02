const sql = require("./database");

// constructor
const Account = function (account) {
    this.account_id=account.account_id;
    this.branch_id = account.branch_id;
    this.balance = account.balance;
    this.plan_id = account.plan_id
    this.customer_id = account.customer_id
  };

  Account.create = (newAccount, result) => {
    sql.query("INSERT INTO account SET ?", newAccount, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created account: ", { id: res.insertId, ...newAccount });
      result(null, { id: res.insertId, ...newAccount });
    });
  };

Account.findById = (id, result) => {
    sql.query("SELECT * FROM account WHERE account_id = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found account: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Account with the id
      result({ kind: "not_found" }, null);
    });
  };


//remove sql injection here
Account.getAll = (title, result) => {
    let query = "SELECT * FROM account";
  
    if (title) {
      query += `WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Account: ", res);
      result(null, res);
    });
  };
  
  Account.updateById = (id, account, result) => {
    sql.query(
      "UPDATE account SET account_id= ?, branch_id = ?,balance = ? , plan_id = ? WHERE customer_id = ?",
      [account.customer_id , account.plan_id ,account.balance , account.branch_id,id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Account with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated account: ", { id: id, ...account });
        result(null, { id: id, ...account });
      }
    );
  };
  
  Account.remove = (id, result) => {
    sql.query("DELETE FROM account WHERE account_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Account with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Account with id: ", id);
      result(null, res);
    });
  };
  
  Account.removeAll = (result) => {
    sql.query("DELETE FROM account", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} account`);
      result(null, res);
    });
  };
  
  module.exports = Account;
  
  