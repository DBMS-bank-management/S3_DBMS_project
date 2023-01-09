import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { getAccountsByID } from "../../api/account";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";

const CustomerAccountsList = () => {
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadAccountsList();
  }, []);

  function loadAccountsList() {
    getAccountsByID()
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => message.error(err))
      .finally(() => setLoading(false));
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
    // {
    //   title: "Customer",
    //   dataIndex: "customer_ID",
    //   key: "customer_ID",
    // },
  ];

  return (
    <>
      <CustomerPageHeading text={"Accounts"} />
      <Card style={{ width: "100%" }}>
        {/* <Button href="accounts/add">Add account</Button> */}

        <Table
          loading={loading}
          dataSource={accounts}
          columns={columns}
          bordered
        />
      </Card>
    </>
  );
};

export default CustomerAccountsList;
