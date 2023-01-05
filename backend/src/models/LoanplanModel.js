const sql = require("./database");

//constructor
const Loan_Plan = function(loan_plan){
    this.plan_ID = loan_plan.Plan_ID;
    this.interest = loan_plan.interest;
    this.duration = loan_plan.duration
}

Loan_Plan.create = (newloan_plan, result) => {
    sql.query("INSERT INTO loan_plan SET ?", newloan_plan, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created loan_plan: ", { id: res.logId, ...newloan_plan });
      result(null, { id: res.insertId, ...newloan_plan });
    });
  };

  Loan_Plan.findById = (id, result) => {
    sql.query("SELECT * FROM loan_plan WHERE plan_ID = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found loan_plan: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found loan_plan with the plan_id
      result({ kind: "not_found" }, null);
    });
  };

  //remove sql injection here

  Loan_Plan.getAll = (title, result) => {
    let query = "SELECT * FROM loan_plan";
  
    if (title) {
      query += `WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("loan_plan: ", res);
      result(null, res);
    });
  };

  Loan_Plan.updateById = (id, loanplan, result) => {
    sql.query(
      "UPDATE loan_plan SET  plan_ID= ?, interest = ?, duration = ? WHERE plan_ID = ?",
      [loanplan.plan_Id, loanplan.interest, loanplan.duration, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found loanplan with the plan_id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated loan_plan: ", { id: id, ...loanplan});
        result(null, { id: id, ...loanplan});
      }
    );
  };

  Loan_Plan.remove = (id, result) => {
    sql.query("DELETE FROM loan_plan WHERE plan_ID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found loan_plan with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted loanplans with id: ", id);
      result(null, res);
    });
  };

  Loan_Plan.removeAll = (result) => {
    sql.query("DELETE FROM loan_plan", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} loanplans`);
      result(null, res);
    });
  };
  
  module.exports = Loan_Plan;