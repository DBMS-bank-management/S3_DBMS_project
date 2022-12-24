import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteEmployee, getEmployees } from "../../../api/employee";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const EmployeeList = () => {
  const [Employee, setEmployee] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadEmployeeList(), []);

  const onDelete = (id) => {
    deleteEmployee(id);
    loadEmployeeList();
  };

  function loadEmployeeList() {
     getEmployees()
      .then((data) => {
        setEmployee(data);
      })
      .catch((err) => message.error(err));
  }

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "emp_ID",
      key: "emp_ID",
    },
    {
      title: "Employee Name",
      dataIndex: "emp_name",
      key: "Emp_name",
    },
    {
      title: "Branch ID",
      dataIndex: "branch_ID",
      key: "branch_ID",
    },
    {
      title: "Manager",
      dataIndex: "Is_manager",
      key: "Is_manager",
      render: (val) => (val ? "yes" : "no"),
    },
    {
      title: "Authorization ID",
      dataIndex: "auth_ID",
      key: "auth_ID",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`employees/${record.emp_ID}`} type="link">
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
      <EmployeePageHeading text={"Employees"} />
      <Card style={{ width: "100%" }}>
        <Button href="employees/add-employee">Add Employee</Button>
        <Table dataSource={Employee} columns={columns} bordered />
      </Card>
    </div>
  );
};

export default EmployeeList;
