import { Button, Card, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/user";
import EmployeePageLayout from "../../components/employeePageLayout";

const UsersList = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  console.log({ users });

  useEffect(() => loadUsersList(), []);

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
  ];

  return (
    <EmployeePageLayout>
      <Card style={{ width: "100%" }}>
        <Button>Add user</Button>
        <Table dataSource={users} columns={columns} bordered />
      </Card>
    </EmployeePageLayout>
  );
};

export default UsersList;
