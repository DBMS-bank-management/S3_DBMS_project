const sql = require("./database");

// constructor
const Employee = function (model) {
  this.emp_id = model.emp_ID;
  this.emp_name = model.emp_name;
};

Employee.create = (newObject, result) => {
  sql.query("INSERT INTO employee SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created model: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Employee.findById = (id, result) => {
  sql.query(`SELECT * FROM employee WHERE emp_ID = '${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found model: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
  });
};


Employee.getAll = (title, result) => {
  let query = "SELECT * FROM employee";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, model, result) => {
  sql.query(
    "UPDATE employee SET password = ?, role = ? WHERE auth_ID = ?",
    [model.password, model.role, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated model: ", { id: id, ...model });
      result(null, { id: id, ...model });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM employee WHERE auth_ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted model with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = (result) => {
  sql.query("DELETE FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Employee;
