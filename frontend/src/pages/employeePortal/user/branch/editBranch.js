import { Button, Card, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { getBranch, updateBranch } from "../../../api/branch";
import { useParams } from "react-router-dom";

export const EditBranch = () => {
  const [branch, setBranch] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  console.log({ branch });

  useEffect(() => loadBranch(), []);

  function loadBranch() {
    getBranch(id)
      .then((data) => {
        setUser(data);
      })
      .then(() => setLoading(false))
      .catch((err) => alert(err));
  }

  function submitData() {
    updateBranch(branch)
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
            initialValue={branch.br_name}
            label="Name"
            name="br_name"
            rules={[
              {
                required: true,
                message: "Branch name is required!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setUser({ ...branch, Name: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            initialValue={branch.location}
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: "Location is required!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setUser({ ...user, location: e.target.value });
              }}
              value={branch.location}
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
              Edit Branch
            </Button>
          </Form.Item>
        </Form>
      </Card>
  );
};
