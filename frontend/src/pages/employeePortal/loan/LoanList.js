import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteLoan, getLoans } from "../../../api/Loan";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const LoanList = () => {
  const [loans, setLoans] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadLoanList(), []);

  const onDelete = (id) => {
    deleteLoan(id);
    loadLoanList();
  };

  function loadLoanList() {
    getLoans()
      .then((data) => {
        setLoans(data);
      })
      .catch((err) => message.error(err));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "loan_ID",
      key: "loan_ID",
    },
    {
      title: "Account ID",
      dataIndex: "acc_ID",
      key: "acc_ID",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
        title: "Plan ID",
        dataIndex: "plan_ID",
        key: "plan_ID",
      },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`loans/${record.account_id}`} type="link">
            Edit
          </Button>
          <ConfirmationDialog
            buttonProps={{ type: "link", danger: true }}
            onOk={() => {
              onDelete(record.loan_ID);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Loans"} />
      <Card style={{ width: "100%" }}>
        <Button href="loans/add">Add loan</Button>
        <Table dataSource={loans} columns={columns} bordered />
      </Card>
    </div>
  );
};

export default LoanList;
