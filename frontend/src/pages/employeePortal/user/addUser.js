import React, { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { addUser } from "../../../api/user";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const AddUser = () => {
  const [formData, setFormData] = useState({ password: "" });
  function submitData() {
    addUser(formData)
      .then((token) => (window.location = "/employee-portal/users"))
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
      <EmployeePageHeading text={"Add user"} />
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
            <Input.Password
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
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
              disabled={!formData.password}
            >
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddUser;
