const sql = require("./database");

// constructor
const Transmode = function (transmode) {
    this.mode_id=transmode.mode_id;
    this.fee = transmode.fee;

  };
  
  Transmode.create = (newTransmode, result) => {
    sql.query("INSERT INTO trans_mode SET ?", newTransmode, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created transmode: ", { id: res.insertId, ...newTransmode });
      result(null, { id: res.insertId, ...newTransmode });
    });
  };
  
  Transmode.findById = (id, result) => {
    sql.query("SELECT * FROM trans_mode WHERE mode_ID = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found transmode: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Branch with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  
  //remove sql injection here
  Transmode.getAll = (title, result) => {
    let query = "SELECT * FROM trans_mode";
  
    if (title) {
      query += `WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Transmodes: ", res);
      result(null, res);
    });
  };
  
  Transmode.updateById = (id, transmode, result) => {
    sql.query(
      "UPDATE trans_mode SET fee = ? WHERE mode_ID = ?",
      [transmode.fee,id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Branch with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated branch: ", { id: id, ...transmode });
        result(null, { id: id, ...transmode });
      }
    );
  };
  
  Transmode.remove = (id, result) => {
    sql.query("DELETE FROM trans_mode WHERE mode_ID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Branch with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Branch with id: ", id);
      result(null, res);
    });
  };
  
  Transmode.removeAll = (result) => {
    sql.query("DELETE FROM trans_mode", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} transmode`);
      result(null, res);
    });
  };
  
  module.exports = Transmode;