// import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { Badge, Descriptions, Table } from 'antd';
import { getFixedDepositsByID } from "../../../api/fd";


const FixedDepositsList = () => {
  const [fixedDeposits, setFixedDeposits] = useState([] );
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
        title: "Date",
        dataIndex: "start_date",
        key: "start_date",
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
    // {
    //     title: "Description",
    //     dataIndex: "description",
    //     key: "description",
    // },
  ];

  return(
    <div style={{width: '100%'}}>
      <Table style={{width:"100%"}} columns={columns} dataSource={fixedDeposits} pagination={false} />
        {/* {accounts.map(account => <div style={{display: 'flex', flexDirection: 'row'}}><div>{account.balance}</div><div>{account.account_ID}</div></div> )} */}
    </div>
  )
};

export default FixedDepositsList;
