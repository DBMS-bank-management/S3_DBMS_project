import { Button, Card, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../../../api/user";
import { useParams } from "react-router-dom";

export const EditUser = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  console.log({ user });

  useEffect(() => loadUser(), []);

  function loadUser() {
    getUser(id)
      .then((data) => {
        setUser(data);
      })
      .then(() => setLoading(false))
      .catch((err) => alert(err));
  }

  function submitData() {
    updateUser(user)
      .then((token) => {
        console.log("edited");
      })
      .catch((err) => alert(err));
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

  console.log({ user });

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
            initialValue={user.password}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            initialValue={user.role}
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
                setUser({ ...user, role: e.target.value });
              }}
              value={user.role}
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
  );
};
