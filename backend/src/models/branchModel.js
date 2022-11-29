const sql = require("./database");

// constructor
const Branch = function (branch) {
  this.branch_id=branch.branch_id;
  this.br_name = branch.br_name;
  this.location = branch.location;
};

Branch.create = (newBranch, result) => {
  sql.query("INSERT INTO branch SET ?", newBranch, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created branch: ", { id: res.insertId, ...newBranch });
    result(null, { id: res.insertId, ...newBranch });
  });
};

Branch.findById = (id, result) => {
  sql.query("SELECT * FROM branch WHERE branch_id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found branch: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Branch with the id
    result({ kind: "not_found" }, null);
  });
};


//remove sql injection here
Branch.getAll = (title, result) => {
  let query = "SELECT * FROM branch";

  if (title) {
    query += `WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Branches: ", res);
    result(null, res);
  });
};

Branch.updateById = (id, branch, result) => {
  sql.query(
    "UPDATE branch SET branch_id = ?, br_name = ? WHERE location = ?",
    [branch.location, branch.br_name,id],
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

      console.log("updated branch: ", { id: id, ...branch });
      result(null, { id: id, ...branch });
    }
  );
};

Branch.remove = (id, result) => {
  sql.query("DELETE FROM branch WHERE branch_id = ?", id, (err, res) => {
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

Branch.removeAll = (result) => {
  sql.query("DELETE FROM branch", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} branches`);
    result(null, res);
  });
};

module.exports = Branch;
