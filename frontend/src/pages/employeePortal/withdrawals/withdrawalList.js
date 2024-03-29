import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteWithdrawal, getWithdrawals } from "../../../api/withdrawal";
import ConfirmationDialog from "../../../components/confirmationDialog";

const WithdrawalList = () => {
  const [withdrawals, setWithdrawals] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadWithdrawalList(), []);

  const onDelete = (id) => {
    deleteWithdrawal(id);
    loadWithdrawalList();
  };

  function loadWithdrawalList() {
    getWithdrawals()
      .then((data) => {
        setWithdrawals(data);
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
      <Card style={{ width: "100%" }}>
        <Button href="withdrawal/add">Add withdrawal</Button>
        <Table dataSource={withdrawals} columns={columns} bordered />
      </Card>
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
export default WithdrawalList;
