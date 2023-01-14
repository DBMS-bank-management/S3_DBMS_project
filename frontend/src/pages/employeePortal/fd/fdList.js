import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { getFDs } from "../../../api/fd";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const FDList = () => {
  const [fds, setFds] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadFDList(), []);

  function loadFDList() {
    getFDs()
      .then((data) => {
        setFds(data);
      })
      .catch((err) => alert(err));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "fd_ID",
      key: "fd_ID",
    },
    {
      title: "Acc_Id",
      dataIndex: "acc_ID",
      key: "acc_ID",
    },
    {
      title: "start_date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "Amount",
    },
    {
      title: "plan_ID",
      dataIndex: "plan_ID",
      key: "plan_ID",
    },
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Fixed Deposits"} />
      <Card style={{ width: "100%" }}>
        <Button
          onClick={() => message.warning("This feature is not implemented!")}
        >
          Add fixed deposit
        </Button>
        <Table dataSource={fds} columns={columns} bordered />
      </Card>
    </div>
  );
};

export default FDList;
