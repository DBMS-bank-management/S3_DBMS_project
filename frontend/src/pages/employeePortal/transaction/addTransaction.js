import React, { useState } from "react";
import { Select } from "antd";
import { addTransaction } from "../../../api/transaction";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import { Button, Checkbox, Form, Input } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onFinish = (formValues) => {
  console.log({ formValues });
};

const AddTransaction = () => (
  <div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="From Account "
        name="FromAccount"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Select
          // initialValues="lucy"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={[
            {
              label: "Jack",
              value: "jack",
            },
            {
              label: "Lucy",
              value: "lucy",
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="To Account"
        name="ToAccount"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Select
          // defaultValue="lucy"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={[
            {
              label: "To Account",
              options: [
                {
                  label: "Jack",
                  value: "jack",
                },
                {
                  label: "Lucy",
                  value: "lucy",
                },
              ],
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Amount"
        name="Amount"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Done
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default AddTransaction;
