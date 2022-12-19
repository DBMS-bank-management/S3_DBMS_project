import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { deleteBranch, getBranches } from "../../../api/branch";
import ConfirmationDialog from "../../../components/confirmationDialog";

const BranchesList = () => {
  const [branches, setBranches] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadBranchesList(), []);

  const onDelete = (id) => {
    deleteBranch(id);
    loadBranchesList();
  };

  function loadBranchesList() {
    getBranches()
      .then((data) => {
        setBranches(data);
      })
      .catch((err) => alert(err));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "branch_ID",
      key: "branch_ID",
    },
    {
      title: "Name",
      dataIndex: "br_name",
      key: "br_name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`branches/${record.branch_ID}`} type="link">
            Edit
          </Button>
          <ConfirmationDialog
            buttonProps={{ type: "link", danger: true }}
            onOk={() => {
              onDelete(record.branch_ID);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ width: "100%" }}>
      <Button href="branches/add">Add branch</Button>
      <Table dataSource={branches} columns={columns} bordered />
    </Card>
  );
};

export default BranchesList;
