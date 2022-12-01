import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../api/user";
import ConfirmationDialog from "../../../components/confirmationDialog";

const UsersList = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadUsersList(), []);

  const onDelete = (id) => {
    deleteUser(id);
    loadUsersList();
  };

  function loadUsersList() {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => alert(err));
  }

  const columns = [
    {
      title: "auth_ID",
      dataIndex: "auth_ID",
      key: "auth_ID",
    },
    {
        title: "ID",
        dataIndex: "ID",
        key: "ID",
      },
    {
        title: "name",
        dataIndex: "name",
        key: "name",
      },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "contact_no",
      dataIndex: "contact_no",
      key: "contact_no",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`customers/${record.auth_ID}`} type="link">
            Edit
          </Button>
          <ConfirmationDialog
            buttonProps={{ type: "link", danger: true }}
            onOk={() => {
              onDelete(record.auth_ID);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ width: "100%" }}>
      <Button href="customers/add">Add user</Button>
      <Table dataSource={users} columns={columns} bordered />
    </Card>
  );
};

export default UsersList;
