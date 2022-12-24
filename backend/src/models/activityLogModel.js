const sql = require("./database");

//constructor
const Activity_log = function(activity_log){
    this.log_id = activity_log.log_id;
    this.auth_id = activity_log.auth_id;
    this.timestamp = activity_log.timestamp;
    this.action = activity_log.action;   
};

Activity_log.create = (newActivity_log, result) => {
    sql.query("INSERT INTO activity_log SET ?", newActivity_log, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created activity_log: ", { id: res.logId, ...newActivity_log });
      result(null, { id: res.insertId, ...newActivity_log });
    });
  };

  Activity_log.findById = (id, result) => {
    sql.query("SELECT * FROM activity_log WHERE log_ID = ?", [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found activity_log: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found activity_log with the log_id
      result({ kind: "not_found" }, null);
    });
  };

  //remove sql injection here

  Activity_log.getAll = (title, result) => {
    let query = "SELECT * FROM activity_log";
  
    if (title) {
      query += `WHERE title LIKE '%${title}%'`;
    }
  
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("activity_log: ", res);
      result(null, res);
    });
  };

  Activity_log.updateById = (id, activity, result) => {
    sql.query(
      "UPDATE activity_log SET  auth_id= ?, timestamp = ?, action = ? WHERE log_ID = ?",
      [activity.auth_id, activity.auth_id, activity.timestamp, activity.action, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated activity_log: ", { id: id, ...activity});
        result(null, { id: id, ...activity});
      }
    );
  };

  Activity_log.remove = (id, result) => {
    sql.query("DELETE FROM activity_log WHERE log_ID = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found activity_log with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted activity with id: ", id);
      result(null, res);
    });
  };

  Activity_log.removeAll = (result) => {
    sql.query("DELETE FROM activity_log", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} activities`);
      result(null, res);
    });
  };
  
  module.exports = Activity_log;