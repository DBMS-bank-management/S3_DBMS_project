import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { isManager } from "../../../api";
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
      title: "Id",
      dataIndex: "auth_ID",
      key: "auth_ID",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" key={record.auth_ID}>
          <Button href={`users/${record.auth_ID}`} type="link">
            Edit
          </Button>
          {isManager() && (
            <ConfirmationDialog
              key={record.auth_ID}
              buttonProps={{ type: "link", danger: true }}
              onOk={() => {
                onDelete(record.auth_ID);
              }}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ width: "100%" }}>
      {isManager() || true && <Button href="users/add">Add user</Button>}
      <Table dataSource={users} columns={columns} bordered rowKey={"auth_ID"} />
    </Card>
  );
};

export default UsersList;
