import React, { useState } from "react";
import { Button, Form, Input, Card, message } from "antd";
import { addBranch } from "../../../api/branch";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const AddBranch = () => {
  const [branch_name, setBranchName] = useState("");
  function submitData() {
    addBranch({ branch_name })
      .then((token) => (window.location = "/employee-portal/branches"))
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
      <EmployeePageHeading text={"Add branch"} />
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
            label="Name"
            name="branch_name"
            rules={[
              {
                required: true,
                message: "Branch name is required!",
              },
            ]}
          >
            <Input.Name onChange={(e) => setBranchName(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" disabled={!branch_name}>
              Add branch
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddBranch;
