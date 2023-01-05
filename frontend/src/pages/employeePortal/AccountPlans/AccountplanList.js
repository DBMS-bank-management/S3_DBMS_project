import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteAccountPlan, getAccountPlans } from "../../../api/accountplan";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const AccountPlanList = () => {
  const [accountplans, setAccountPlans] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadAccountPlanList(), []);

  const onDelete = (id) => {
    deleteAccountPlan(id);
    loadAccountPlanList();
  };

  function loadAccountPlanList() {
    getAccountPlans()
      .then((data) => {
        setAccountPlans(data);
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
      title: "Account Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Withdrawal Count",
      dataIndex: "withdrawal_count",
      key: "withdrawal_count",
    },
    {
      title: "Interest",
      dataIndex: "interest",
      key: "interest",
    },
    {
      title: "Minimum Amount",
      dataIndex: "min_amount",
      key: "Min_amount",
    }
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Account Plans"} />
      <Card style={{ width: "100%" }}>
        <Button href="accountplan/add">Add AccountPlan</Button>
        <Table dataSource={accountplans} columns={columns} bordered />
      </Card>
    </div>
  );
};

export default AccountPlanList;
