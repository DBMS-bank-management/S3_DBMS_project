import { Button, Card, Space, Table, message, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  declineNormalApplication,
  deleteNormalApplication,
  getNormalApplications,
} from "../../../api/normalApplication";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import { NavigateButton } from "../../../components/NavigateButton";
import { formatDate } from "../../../utils";

const NormalApplicationsList = () => {
  const [normalApplications, setNormalApplications] = useState();
  const [loading, setLoading] = useState(true);

  const onApprove = (id) => {};

  const onDecline = (id) => {
    declineNormalApplication(id)
      .then(() => message.success("Successfully declined normal application"))
      .then(() => {
        loadNormalApplicationsList();
      })
      .catch((err) => message.error("Error declining normal application!"));
  };

  useEffect(() => {
    setLoading(true);
    loadNormalApplicationsList();
  }, []);

  const onDelete = (id) => {
    deleteNormalApplication(id);
    loadNormalApplicationsList();
  };

  function loadNormalApplicationsList() {
    getNormalApplications()
      .then((data) => {
        setNormalApplications(data);
        setLoading(false);
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
    // {
    //     title: "Is Approved",
    //     dataIndex: "is_approved",
    //     key: "is_approved",
    // },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Space size="middle" key={record.app_ID}>
          {record.is_approved == 1 && <Tag color="success">Approved</Tag>}
          {record.is_approved == 0 && <Tag color="error">Declined</Tag>}
          {record.is_approved == null && <Tag color="warning">Pending</Tag>}

          {/* <Button href={`normalApplications/${record.app_ID}`} type="link">
            Edit
          </Button>
            <ConfirmationDialog
              buttonProps={{ type: "link", danger: true }}
              onOk={() => {
                onDelete(record.app_ID);
              }}
            /> */}
        </Space>
      ),
    },
    {
      title: "App Date",
      dataIndex: "app_date",
      render: (date) => <div>{formatDate(date)}</div>,
      key: "app_date",
    },
    {
      title: "Loan ID",
      dataIndex: "loan_ID",
      key: "loan_ID",
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle" key={record.app_ID}>
    //       <Button href={`normalApplications/${record.app_ID}`} type="link">
    //         Edit
    //       </Button>
    //       <ConfirmationDialog
    //         buttonProps={{ type: "link", danger: true }}
    //         onOk={() => {
    //           onDelete(record.app_ID);
    //         }}
    //       />
    //     </Space>
    //   ),
    // },
    {
      title: "Extra Action",
      key: "extra_action",
      render: (_, record) => (
        <Space size="middle" key={record.app_ID}>
          {record.is_approved == null && (
            <Button onClick={() => onApprove(record.app_ID)}>Approve</Button>
          )}
          {record.is_approved == null && (
            <Button onClick={() => onDecline(record.app_ID)} danger>
              Decline
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ width: "100%" }}>
      <NavigateButton href="add">Add Normal Application</NavigateButton>
      <Table
        loading={loading}
        dataSource={normalApplications}
        columns={columns}
        bordered
      />
    </Card>
  );
};

export default NormalApplicationsList;
