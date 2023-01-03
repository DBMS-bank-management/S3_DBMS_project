// import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { Badge, Descriptions, Table } from 'antd';
import { getAccountsByID } from "../../../api/account";


const AccountsList = () => {
  const [accounts, setAccounts] = useState([] );
  const [loading, setLoading] = useState(true);

  useEffect(() => loadAccountsList(), []);


  function loadAccountsList() {
    getAccountsByID()
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => alert(err));
  }

  const columns = [
    
    {
        title: "Account Number",
        dataIndex: "account_ID",
        key: "account_ID",
      },
    // {
    //     title: "Branch ID",
    //     dataIndex: "branch_ID",
    //     key: "branch_ID",
    //   },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    // {
    //   title: "Plan ID",
    //   dataIndex: "plan_ID",
    //   key: "plan_ID",
    // },
  ];

  return(
    <div style={{width: '100%'}}>
      <Table style={{width:"100%"}} columns={columns} dataSource={accounts} pagination={false} />
        {/* {accounts.map(account => <div style={{display: 'flex', flexDirection: 'row'}}><div>{account.balance}</div><div>{account.account_ID}</div></div> )} */}
    </div>
  )
};

export default AccountsList;
