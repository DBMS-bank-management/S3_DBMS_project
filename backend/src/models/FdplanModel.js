const sql = require("./database");

//constructor
const Fd_Plan = function(fd_plan){
    this.plan_ID = fd_plan.Plan_ID;
    this.interest = fd_plan.interest;
    this.duration = fd_plan.duration
}

Fd_Plan.create = (newfd_plan, result) => {
    sql.query("INSERT INTO fd_plan SET ?", newfd_plan, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created fd_plan: ", { id: res.logId, ...newfd_plan });
      result(null, { id: res.insertId, ...newfd_plan });
    });
  };

  Fd_Plan.findById = (id, result) => {
    sql.query("SELECT * FROM fd_plan WHERE plan_ID = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found fd_plan: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found fd_plan with the plan_id
      result({ kind: "not_found" }, null);
    });
  };

  //remove sql injection here

  Fd_Plan.getAll = (title, result) => {
    let query = "SELECT * FROM fd_plan";
  
    if (title) {
      query += `WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("fd_plan: ", res);
      result(null, res);
    });
  };

  Fd_Plan.updateById = (id, fdplan, result) => {
    sql.query(
      "UPDATE fd_plan SET  plan_ID= ?, duration = ? interest = ?, WHERE plan_ID = ?",
      [fdplan.plan_Id, fdplan.duration, fdplan.interest, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found fdplans with the plan_id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated fd_plan: ", { id: id, ...fdplan});
        result(null, { id: id, ...fdplan});
      }
    );
  };

  Fd_Plan.remove = (id, result) => {
    sql.query("DELETE FROM fd_plan WHERE plan_ID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found fd_plan with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted fdplans with id: ", id);
      result(null, res);
    });
  };

  Fd_Plan.removeAll = (result) => {
    sql.query("DELETE FROM fd_plan", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} fdplans`);
      result(null, res);
    });
  };
  
  module.exports = Fd_Plan;