import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { getPendingLoanApplicationsByID } from "../../api/normalApplication";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";
import { formatDate } from "../../utils";

const CustomerPendingApplicationsList = () => {
  const [pendingApplications, setPendingApplications] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadpendingApplicationsList();
  }, []);

  function loadpendingApplicationsList() {
    getPendingLoanApplicationsByID()
      .then((data) => {
        setPendingApplications(data);
      })
      .catch((err) => message.error(err))
      .finally(() => setLoading(false));
  }

  const columns = [
    {
      title: "Application ID",
      dataIndex: "app_ID",
      key: "app_ID",
    },
    {
      title: "Branch ID",
      dataIndex: "branch_ID",
      key: "branch_ID",
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
      title: "Date",
      dataIndex: "app_date",
      render: (date) => <div>{formatDate(date)}</div>,
      key: "app_date",
    },
    {
      title: "Loan ID",
      dataIndex: "loan_ID",
      key: "loan_ID",
    },
  ];

  return (
    <>
      <CustomerPageHeading text={"Pending Loan Applications"} />
      <Card style={{ width: "100%" }}>
        {/* <Button href="accounts/add">Add account</Button> */}

        <Table
          loading={loading}
          dataSource={pendingApplications}
          columns={columns}
          bordered
        />
      </Card>
    </>
  );
};

export default CustomerPendingApplicationsList;
