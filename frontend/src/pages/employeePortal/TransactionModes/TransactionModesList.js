import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteLoanPlan, getLoanPlans } from "../../../api/transactionmode";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const TrasactionModeList = () => {
  const [loanplans, setLoanPlans] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadLoanPlanList(), []);

  const onDelete = (id) => {
    deleteLoanPlan(id);
    loadLoanPlanList();
  };

  function loadLoanPlanList() {
    getLoanPlans()
      .then((data) => {
        setLoanPlans(data);
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
    }
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Loan Plans"} />
      <Card style={{ width: "100%" }}>
        <Button href="loanplan/add">Add LoanPlan</Button>
        <Table dataSource={loanplans} columns={columns} bordered />
      </Card>
    </div>
  );
};

export default LoanPlanList;
