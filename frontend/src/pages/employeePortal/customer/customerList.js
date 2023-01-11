import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../../../api/customer";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import { NavigateButton } from "../../../components/NavigateButton";

const CustomersList = () => {
  const [customer, setCustomers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadCustomersList(), []);

  const onDelete = (id) => {
    deleteCustomer(id);
    loadCustomersList();
  };

  function loadCustomersList() {
    getCustomers()
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => alert(err));
  }

  const columns = [
    
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
      title: "auth_ID",
      dataIndex: "auth_ID",
      key: "auth_ID",
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
    <div className="transparent">
      <EmployeePageHeading text={"Customers"} />
    <Card style={{ width: "100%" }}>
      <NavigateButton href="add">Add Customer</NavigateButton>
      <Table dataSource={customer} columns={columns} bordered />
    </Card>
    </div>
  );
};

export default CustomersList;
