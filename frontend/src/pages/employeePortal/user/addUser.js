import React, { useState } from "react";
import { Button, Form, Input, Card } from "antd";
import { addUser } from "../../../api/user";
import EmployeePageLayout from "../../../components/employeePageLayout";

const AddUser = () => {
  const [password, setPassword] = useState("");
  function submitData() {
    addUser({ password })
      .then((token) => (window.location = "/employee-portal/users"))
      .catch((err) => alert(err));
  }

  const onFinish = (values) => {
    submitData();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" disabled={!password}>
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Card>
  );
};

export default AddUser;
