import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteAccount, getAccounts } from "../../../api/account";
import ConfirmationDialog from "../../../components/confirmationDialog";

const AccountsList = () => {
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadAccountsList(), []);

  const onDelete = (id) => {
    deleteAccount(id);
    loadAccountsList();
  };

  function loadAccountsList() {
    getAccounts()
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => message.error(err));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "account_ID",
      key: "account_ID",
    },
    {
      title: "Name",
      dataIndex: "branch_ID",
      key: "branch_ID",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
        title: "Plan",
        dataIndex: "plan_ID",
        key: "plan_ID",
      },
      {
        title: "Customer",
        dataIndex: "customer_ID",
        key: "customer_ID",
      },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`accounts/${record.account_id}`} type="link">
            Edit
          </Button>
          <ConfirmationDialog
            buttonProps={{ type: "link", danger: true }}
            onOk={() => {
              onDelete(record.account_id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
      <Card style={{ width: "100%" }}>
        <Button href="accounts/add">Add account</Button>
        <Table dataSource={accounts} columns={columns} bordered />
      </Card>
  );
};

export default AccountsList;
