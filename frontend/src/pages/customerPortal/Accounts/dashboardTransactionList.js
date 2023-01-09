// import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { Badge, Descriptions, Table } from 'antd';
import { getTransactionsByID } from "../../../api/transaction";
import { formatDate } from "../../../utils";


const TransactionsList = () => {
  const [transactions, setTransactions] = useState([] );
  const [loading, setLoading] = useState(true);

  useEffect(() => loadTransactionsList(), []);


  function loadTransactionsList() {
    getTransactionsByID()
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => alert(err));
  }

  const columns = [
    
    {
        title: "Date",
        dataIndex: "timestamp",
        render: (date) => <div>{formatDate(date)}</div>,
        key: "timestamp",
      },
    // {
    //     title: "Branch ID",
    //     dataIndex: "branch_ID",
    //     key: "branch_ID",
    //   },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
  ];

  return(
    <div style={{width: '100%'}}>
      <Table style={{width:"100%"}} columns={columns} dataSource={transactions} pagination={false} />
        {/* {accounts.map(account => <div style={{display: 'flex', flexDirection: 'row'}}><div>{account.balance}</div><div>{account.account_ID}</div></div> )} */}
    </div>
  )
};

export default TransactionsList;
