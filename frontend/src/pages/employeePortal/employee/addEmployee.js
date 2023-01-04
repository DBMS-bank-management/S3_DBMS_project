import React, { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { addEmployee } from "../../../api/employee";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const AddEmployee = () => {
  const [formData, setFormData] = useState({ emp_name: "", branch_ID: "", Is_Manager: "", auth_ID: ""});
  function submitData() {
    addEmployee(formData)
      .then((token) => (window.location = "/employee-portal/employees"))
      .catch((err) => message.error(err));
  }

  const onFinish = (values) => {
    submitData();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Add Employee"} />
      <Card>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Employee Name"
            name="emp_name"
            rules={[
              {
                required: true,
                message: "Employee name is required!",
              },
            ]}
          >
            <Input.Password
              value={formData.emp_name}
              onChange={(e) => {
                setFormData({ ...formData, emp_name: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Branch ID"
            name="branch_ID"
            rules={[
              {
                required: true,
                message: "Branch ID is required!",
              },
            ]}
          >
            <Input.Password
              value={formData.branch_ID}
              onChange={(e) => {
                setFormData({ ...formData, branch_ID: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Is Manager"
            name="Is_Manager"
            rules={[
              {
                required: true,
                message: "Is Manager is required!",
              },
            ]}
          >
            <Input.Password
              value={formData.Is_Manager}
              onChange={(e) => {
                setFormData({ ...formData, Is_Manager: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item
            label="Auth ID"
            name="auth_ID"
            rules={[
              {
                required: true,
                message: "Auth ID is required!",
              },
            ]}
          >
            <Input.Password
              value={formData.auth_ID}
              onChange={(e) => {
                setFormData({ ...formData, auth_ID: e.target.value });
              }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={!formData.emp_name}
            >
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddEmployee;
