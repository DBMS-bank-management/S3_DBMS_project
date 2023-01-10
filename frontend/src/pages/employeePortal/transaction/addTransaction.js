import React, { useEffect, useState } from "react";
import {
  InputNumber,
  message,
  Select,
  Button,
  Checkbox,
  Form,
  Input,
} from "antd";
import { addTransaction, addTransfer } from "../../../api/transaction";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import { getAccounts } from "../../../api/account";
import { useNavigate } from "react-router-dom";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};



const AddTransaction = () => {
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadAccountsList();
  }, []);

  const navigate = useNavigate()

  const onFinish = (formValues) => {
    addTransfer(formValues)
      .then(() => {
        message.success("Transfer done");
      })
      .then(() => navigate('/employee-portal/transactions'))
      .catch((err) => {
        console.log({ err });
        message.error("Transfer Error!");
      });
    console.log({ formValues });
    
  };

  function loadAccountsList() {
    getAccounts()
      .then((data) => {
        setAccounts(
          data.map((acc) => ({ label: acc.account_ID, value: acc.account_ID }))
        );
      })
      .catch((err) => message.error(err))
      .finally(() => setLoading(false));
  }

  return (
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
            showSearch
            filterOption={
              (input, option) => option.label === input
              // (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleChange}
            options={accounts}
          />
        </Form.Item>
        <Form.Item
          label="To Account"
          name="ToAccount"
          rules={[
            { required: true, message: "Please input your from account" },
          ]}
        >
          <Select
            // defaultValue="lucy"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            showSearch
            filterOption={
              (input, option) => option.label === input
              // (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={accounts}
          />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="Amount"
          rules={[{ required: true, message: "Please input initial deposit" }]}
        >
          <InputNumber />
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
};

export default AddTransaction;
