const sql = require("./database");

// constructor
const Customer = function (customer) {
  this.ID = customer.ID;
  this.name = customer.name;
  this.type=customer.type;
  this.auth_ID=customer.auth_ID;
  this.contact_no=customer.contact_no;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (id, result) => {
  sql.query("SELECT * FROM customer WHERE ID = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


//remove sql injection here
Customer.getAll = (name, result) => {
  let query = "SELECT * FROM customer";

  // if (name) {
  //   query += `WHERE title LIKE '%${name}%'`;
  // }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customer SET name = ?, type = ?, auth_ID, contact_no = ? = ? WHERE ID = ?",
    [customer.name, customer.type,customer.auth_ID,customer.contact_no, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query("DELETE FROM customer WHERE ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Customer.removeAll = (result) => {
  sql.query("DELETE FROM customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};



module.exports = Customer;
