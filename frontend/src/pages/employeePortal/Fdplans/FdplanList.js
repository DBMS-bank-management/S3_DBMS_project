import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteFdPlan, getFdPlans } from "../../../api/fdplan";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const FdPlanList = () => {
  const [fdplans, setfdPlans] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadFdPlanList(), []);

  const onDelete = (id) => {
    deleteFdPlan(id);
    loadFdPlanList();
  };

  function loadFdPlanList() {
    getFdPlans()
      .then((data) => {
        setfdPlans(data);
      })
      .catch((err) => message.error(err));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "plan_ID",
      key: "Plan_ID",
    },
    {
      title: "Interest",
      dataIndex: "interest",
      key: "interest",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Fd Plans"} />
      <Card style={{ width: "100%" }}>
        <Button href="fixeddepositplans/add">Add FdPlan</Button>
        <Table dataSource={fdplans} columns={columns} bordered />
      </Card>
    </div>
  );
};

export default FdPlanList;
