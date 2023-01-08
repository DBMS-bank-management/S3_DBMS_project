import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteNormalApplication, getNormalApplications } from "../../../api/normalApplication";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const NormalApplicationsList = () => {
  const [normalApplications, setNormalApplications] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadNormalApplicationsList(), []);

  const onDelete = (id) => {
    deleteNormalApplication(id);
    loadNormalApplicationsList();
  };

  function loadNormalApplicationsList() {
    getNormalApplications()
      .then((data) => {
        setNormalApplications(data);
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
        title: "Is Approved",
        dataIndex: "is_approved",
        key: "is_approved",
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
          <Button href={`normalApplications/${record.app_ID}`} type="link">
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
      
    <Card style={{ width: "100%" }}>
     
      <Button href="normal-applications/add">Add Normal Applicaion</Button>
      <Table dataSource={normalApplications} columns={columns} bordered />
    </Card>
  );
};

export default NormalApplicationsList;
