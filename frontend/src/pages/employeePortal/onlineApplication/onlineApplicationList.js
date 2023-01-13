import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteOnlineApplication, getOnlineApplications } from "../../../api/onlineApplication";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const OnlineApplicationsList = () => {
  const [onlineApplications, setOnlineApplications] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadOnlineApplicationsList(), []);

  const onDelete = (id) => {
    deleteOnlineApplication(id);
    loadOnlineApplicationsList();
  };

  function loadOnlineApplicationsList() {
    getOnlineApplications()
      .then((data) => {
        setOnlineApplications(data);
      })
      .catch((err) => message.error(err));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "app_ID",
      key: "app_ID",
    },
    {
      title: "FD ID",
      dataIndex: "fd_ID",
      key: "fd_ID",
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
        title: "App Date",
        dataIndex: "app_date",
        key: "app_date",
    },
    {
        title: "Loan ID",
        dataIndex: "loan_ID",
        key: "loan_ID",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" key={record.app_ID}>
          <Button href={`onlineApplications/${record.app_ID}`} type="link">
            Edit
          </Button>
            <ConfirmationDialog
              buttonProps={{ type: "link", danger: true }}
              onOk={() => {
                onDelete(record.app_ID);
              }}
            />
        </Space>
      ),
    },
  ];

  return (
    <div className="transparent">
    <EmployeePageHeading text={"Online Applications"} />
    <Card style={{ width: "100%" }}>
      {/* <Button href="onlineApplicatins/add">Add Online Applicaion</Button> */}
      <Table dataSource={onlineApplications} columns={columns} bordered />
    </Card>
  </div>
  );
};

export default OnlineApplicationsList;
