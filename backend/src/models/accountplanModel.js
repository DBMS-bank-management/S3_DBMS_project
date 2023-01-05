const sql = require("./database");

//constructor
const Account_plan = function(account_plan){
    this.log_id = account_plan.Plan_ID;
    this.type = account_plan.type;
    this.withdrawal_count = account_plan.withdrawal_count;
    this.min_amount = account_plan.min_amount
    this.interest = account_plan.interest;   
};

Account_plan.create = (newAccount_plan, result) => {
    sql.query("INSERT INTO account_plan SET ?", newAccount_plan, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created account_plan: ", { id: res.logId, ...newAccount_plan });
      result(null, { id: res.insertId, ...newAccount_plan });
    });
  };

  Account_plan.findById = (id, result) => {
    sql.query("SELECT * FROM account_plan WHERE plan_ID = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found account_plan: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found account_plan with the plan_id
      result({ kind: "not_found" }, null);
    });
  };

  //remove sql injection here

  Account_plan.getAll = (title, result) => {
    let query = "SELECT * FROM account_plan";
  
    if (title) {
      query += `WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("account_plan: ", res);
      result(null, res);
    });
  };

  Account_plan.updateById = (id, accountplan, result) => {
    sql.query(
      "UPDATE account_plan SET  plan_ID= ?, type = ?, withdrawal_count = ?, min_amount = ?, interest = ? WHERE plan_ID = ?",
      [accountplan.plan_Id, accountplan.type, accountplan.withdrawal_count, accountplan.min_amount, accountplan.interest, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found accountplan with the plan_id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated account_plan: ", { id: id, ...accountplan});
        result(null, { id: id, ...accountplan});
      }
    );
  };

  Account_plan.remove = (id, result) => {
    sql.query("DELETE FROM account_plan WHERE plan_ID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found account_plan with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted accountplan with id: ", id);
      result(null, res);
    });
  };

  Account_plan.removeAll = (result) => {
    sql.query("DELETE FROM account_plan", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} accountplans`);
      result(null, res);
    });
  };
  
  module.exports = Account_plan;