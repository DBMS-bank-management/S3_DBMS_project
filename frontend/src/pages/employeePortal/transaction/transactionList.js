import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteTransaction, getTransactions } from "../../../api/transaction";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const TransactionList = () => {
  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadTransactionList(), []);

  const onDelete = (id) => {
    deleteTransaction(id);
    loadTransactionList();
  };

  function loadTransactionList() {
    getTransactions()
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => message.error(err));
  }

  const columns = [
    {
      title: "Trans_ID",
      dataIndex: "trans_ID",
      key: "trans_ID",
    },
    {
      title: "mode_ID",
      dataIndex: "mode_ID",
      key: "mode_ID",
    },
    {
      title: "Account",
      dataIndex: "acc_ID",
      key: "acc_ID",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      
    
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Transactions"} />
      <Card style={{ width: "100%" }}>
        <Button href="transactions/add">Add transaction</Button>
        <Table dataSource={transactions} columns={columns} bordered />
      </Card>
    </div>
  );
};

{/*return (
  <div className="transparent">
    <EmployeePageHeading text={"Transactions"} />
    <Card style={{ width: "100%" }}>
      <Button href="transactions/add">Add Transaction</Button>
      <Table dataSource={Transaction} columns={columns} bordered />
    </Card>
  </div>
);*/}
export default TransactionList;
