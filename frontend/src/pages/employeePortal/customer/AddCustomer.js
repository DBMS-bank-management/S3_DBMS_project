import React, { useState } from "react";
import { Button, Form, Input, Card, message, Select } from "antd";
import { addCustomer } from "../../../api/customer";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const AddCustomer = () => {
  //   const [formData, setFormData] = useState({ password: "" });
  function submitData(values) {
    addCustomer(values)
      .then((token) => (window.location = "/employee-portal/customers"))
      .catch((err) => message.error(err));
  }

  const onFinish = (values) => {
    submitData(values);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Add customer"} />
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
            label="Username"
            name="ID"
            rules={[
              {
                required: true,
                message: "Username is required!",
              },
            ]}
          >
            <Input
            //   value={formData.password}
            //   onChange={(e) => {
            //     setFormData({ ...formData, password: e.target.value });
            //   }}
            />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "name is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account type"
            name="type"
            rules={[
              {
                required: true,
                message: "Account type is required!",
              },
            ]}
          >
            <Select
              // initialValues="lucy"
              style={{
                width: 200,
              }}
              // onChange={handleChange}
              options={[
                {
                  label: "Individual",
                  value: "individual",
                },
                {
                  label: "Organization",
                  value: "organization",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Contact no"
            name="contact_no"
            rules={[
              {
                required: true,
                message: "Contact no. is required!",
              },

              {
                pattern: /^(?:\d*)$/,
                message: "Value should contain just number",
              },
              {
                min: 10,
                message: "Value should be 10 numbers",
              },
              {
                max: 10,
                message: "Value should be 10 numbers",
              },
            ]}
          >
            <Input
            //   value={formData.password}
            //   onChange={(e) => {
            //     setFormData({ ...formData, password: e.target.value });
            //   }}
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
              //   disabled={!formData.password}
            >
              Add Customer
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddCustomer;
