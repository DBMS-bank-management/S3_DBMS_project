import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getLogs } from "../../../api/activitylog";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";


const LogsList = () => {
    const [activities, setLogs] = useState();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => loadLogsList(), []);


function loadLogsList() {
    getLogs()
      .then((data) => {
        setLogs(data);
      })
      .catch((err) => alert(err));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "log_ID",
      key: "Log_ID",
    },
    {
      title: "Auth_Id",
      dataIndex: "auth_ID",
      key: "auth_ID",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "Action",
      dataIndex: "action",
      key:"action"
    }  
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Activity Logs"} />
      <Card style={{ width: "100%" }}>
        <Table dataSource={activities} columns={columns} bordered />
      </Card>
    </div>
  );
};

export default LogsList;
