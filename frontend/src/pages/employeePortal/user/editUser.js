import { Button, Card, Form, Input, Radio, message } from "antd";
import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../../../api/user";
import { useParams } from "react-router-dom";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

export const EditUser = () => {
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  console.log({ formData });

  useEffect(() => loadUser(), []);

  function loadUser() {
    getUser(id)
      .then((data) => {
        setFormData(data);
      })
      .then(() => setLoading(false))
      .catch((err) => message.error(err));
  }

  function submitData() {
    updateUser(formData)
      .then((token) => {
        console.log("edited");
      })
      .catch((err) => message.error(err));
  }

  const onFinish = (values) => {
    submitData();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (loading) {
    return <div></div>;
  }

  console.log({ formData });

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Edit User " + id} />
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
            initialValue={formData.password}
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
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            initialValue={formData.role}
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "role is required!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setFormData({ ...formData, role: e.target.value });
              }}
              value={formData.role}
            >
              {["employee", "customer", "manager"].map((role) => (
                <Radio key={role} value={role}>
                  {role}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" disabled={false}>
              Edit User
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
