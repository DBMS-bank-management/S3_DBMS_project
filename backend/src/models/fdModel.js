const sql = require("./database");

// constructor
const FD = function (fd) { 

    this.fd_ID=fd.fd_ID; 
    this.acc_ID =fd.acc_ID; 
    this.start_date=fd.start_date; 
    this.amount =fd.amount; 
    this.plan_ID=fd.plan_ID;
  };

  FD.create = (newFD, result) => {
    sql.query("INSERT INTO fixed_deposit SET ?", newFD, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created fd: ", { id: res.insertId, ...newFD });
      result(null, { id: res.insertId, ...newFD });
    });
  };

FD.findById = (id, result) => {
    sql.query("SELECT * FROM fixed_deposit WHERE inst_ID = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found fd: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found FD with the id
      result({ kind: "not_found" }, null);
    });
  };


//remove sql injection here
FD.getAll = (title, result) => {
    let query = "SELECT * FROM fixed_deposit";
  
    if (title) {
      query += `WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("FD: ", res);
      result(null, res);
    });
  };
  
  FD.updateById = (id, fd, result) => {
    sql.query(
      "UPDATE fixed_deposit SET fd_ID = ?, acc_ID = ? , start_date = ? , amount = ?,plan_ID = ? WHERE fd_ID = ?",
      [fd.fd_ID , fd.acc_ID ,fd.start_date , fd.amount, fd.plan_ID ,id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found FD with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated fd: ", { id: id, ...fd });
        result(null, { id: id, ...fd });
      }
    );
  };
  
  FD.remove = (id, result) => {
    sql.query("DELETE FROM fixed_deposit WHERE fd_ID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found FD with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted FD with id: ", id);
      result(null, res);
    });
  };
  
  FD.removeAll = (result) => {
    sql.query("DELETE FROM fixed_deposit", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} fd`);
      result(null, res);
    });
  };
  
  module.exports = FD;
  
  