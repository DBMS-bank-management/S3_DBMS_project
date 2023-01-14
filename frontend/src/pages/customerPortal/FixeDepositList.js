// import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getFixedDepositsByID } from "../../api/fd";
import { formatDate } from "../../utils";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";
import SearchableTable from "../../components/SearchableTable";

const CustomerFixedDepositsList = () => {
  const [fixedDeposits, setFixedDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => loadFixedDepositsList(), []);

  function loadFixedDepositsList() {
    getFixedDepositsByID()
      .then((data) => {
        setFixedDeposits(data);
      })
      .catch((err) => alert(err));
  }
  const columns = [
    {
      title: "Id",
      dataIndex: "fd_ID",
      key: "fd_ID",
    },
    {
      title: "Acc_Id",
      dataIndex: "acc_ID",
      key: "acc_ID",
    },
    {
      title: "start_date",
      dataIndex: "start_date",
      render: (date) => <div>{formatDate(date)}</div>,
      key: "start_date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "Amount",
    },
    {
      title: "plan_ID",
      dataIndex: "plan_ID",
      key: "plan_ID",
    },
  ];

  return (
    <>
      <CustomerPageHeading text={"Fixed deposits"} />
      <div style={{ width: "100%", minHeight: 300 }}>
        <SearchableTable
          style={{ width: "100%" }}
          columns={columns}
          dataSource={fixedDeposits}
          pagination={false}
        />
        {/* {accounts.map(account => <div style={{display: 'flex', flexDirection: 'row'}}><div>{account.balance}</div><div>{account.account_ID}</div></div> )} */}
      </div>
    </>
  );
};

export default CustomerFixedDepositsList;
