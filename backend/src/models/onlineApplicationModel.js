const sql = require("./database");

// constructor
const OnlineApplication = function (onlineApplication) {
  this.app_ID = onlineApplication.app_ID;
  this.fd_ID = onlineApplication.fd_ID;
  this.acc_ID=onlineApplication.acc_ID;
  this.amount=onlineApplication.amount;
  this.app_date=onlineApplication.app_date;
  this.loan_ID=onlineApplication.loan_ID;
};

OnlineApplication.create = (newOnlineApplication, result) => {
  
  sql.query("call Creating_Online_application(?);", [newOnlineApplication.fd_ID,newOnlineApplication.acc_ID, newOnlineApplication.amount, newOnlineApplication.app_date] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created online application: ", { id: res.insertId, ...newOnlineApplication });
    result(null, { id: res.insertId, ...newOnlineApplication });
  });
};

OnlineApplication.findById = (id, result) => {
  sql.query("SELECT * FROM online_application WHERE app_ID = ?", [id], (err, res) => {
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

    // not found Online Application with the id
    result({ kind: "not_found" }, null);
  });
};


//remove sql injection here
OnlineApplication.getAll = (name, result) => {
  let query = "SELECT * FROM online_application";

  // if (name) {
  //   query += `WHERE title LIKE '%${name}%'`;
  // }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("onlineApplications: ", res);
    result(null, res);
  });
};

OnlineApplication.updateById = (id, onlineApplication, result) => {
  sql.query(
    "UPDATE online_application SET fd_ID = ?, acc_ID = ?, amount = ?, app_date = ?, loan_ID = ? WHERE app_ID = ?",
    [onlineApplication.fd_ID, onlineApplication.acc_ID,onlineApplication.amount, onlineApplication.app_date, onlineApplication.loan_ID, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Online Application with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated online application: ", { id: id, ...onlineApplication });
      result(null, { id: id, ...onlineApplication });
    }
  );
};

OnlineApplication.remove = (id, result) => {
  sql.query("DELETE FROM online_application WHERE app_ID = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Online Application with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted online application with id: ", id);
    result(null, res);
  });
};

OnlineApplication.removeAll = (result) => {
  sql.query("DELETE FROM online_application", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} online applications`);
    result(null, res);
  });
};



// OnlineApplication.approve = (application_id) => {
//   sql.query("call approve_online_application(?);", application_id , (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
    
//         console.log(`Eligible for taking the loan`);
//         result(null, res);
//       });
// }

module.exports = OnlineApplication;
