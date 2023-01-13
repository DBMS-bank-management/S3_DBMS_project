import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { isManager } from "../../../api/authentication.js";
import { deleteUser, getUsers } from "../../../api/user";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const UsersList = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadUsersList();
  }, []);

  const onDelete = (id) => {
    deleteUser(id);
    loadUsersList();
  };

  function loadUsersList() {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => message.error(err))
      .finally(() => setLoading(false));
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "auth_ID",
      key: "auth_ID",
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle" key={record.auth_ID}>
    //       <Button href={`users/${record.auth_ID}`} type="link">
    //         Edit
    //       </Button>
    //       {isManager() && (
    //         <ConfirmationDialog
    //           key={record.auth_ID}
    //           buttonProps={{ type: "link", danger: true }}
    //           onOk={() => {
    //             onDelete(record.auth_ID);
    //           }}
    //         />
    //       )}
    //     </Space>
    //   ),
    // },
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Users"} />
      <Card style={{ width: "100%" }}>
        {/* {isManager() && <Button href="users/add">Add user</Button>} */}
        <Table
          loading={loading}
          dataSource={users}
          columns={columns}
          bordered
          rowKey={"auth_ID"}
        />
      </Card>
    </div>
  );
};

export default UsersList;
