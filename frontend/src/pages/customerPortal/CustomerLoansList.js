// import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Badge, Descriptions, Table } from "antd";
import { getLoansByID } from "../../api/Loan";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";

const CustomerLoansList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => loadLoansList(), []);

  function loadLoansList() {
    getLoansByID()
      .then((data) => {
        setLoans(data);
      })
      .catch((err) => alert(err));
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
    // {
    //     title: "Description",
    //     dataIndex: "description",
    //     key: "description",
    // },
  ];

  return (
    <>
      <CustomerPageHeading text={"Loans"} />
      <div style={{ width: "100%" }}>
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={loans}
          pagination={false}
        />
        {/* {accounts.map(account => <div style={{display: 'flex', flexDirection: 'row'}}><div>{account.balance}</div><div>{account.account_ID}</div></div> )} */}
      </div>
    </>
  );
};

export default CustomerLoansList;
