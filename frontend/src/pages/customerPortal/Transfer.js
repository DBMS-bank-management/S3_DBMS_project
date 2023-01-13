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
import { useNavigate } from "react-router-dom";
import { addTransfer, addTransferByCustomer } from "../../api/transaction";
import { getAccounts, getAccountsByID } from "../../api/account";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Transfer = () => {
  const [accounts, setAccounts] = useState([]);
  const [cusAccounts, setCusAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadCustomerAccountsList();
    loadAccountsList();
  }, []);

  const navigate = useNavigate();

  const onFinish = (formValues) => {
    addTransferByCustomer(formValues)
      .then(() => {
        message.success("Transfer done");
      })
      .then(() => navigate("/customer-portal"))
      .catch((err) => {
        console.log({ err });
        message.error("Transfer Error!");
      });
    console.log({ formValues });
  };

  function loadCustomerAccountsList() {
    getAccountsByID()
      .then((data) => {
        setCusAccounts(
          data.map((acc) => ({ label: acc.account_ID, value: acc.account_ID }))
        );
      })
      .catch((err) => message.error(err))
      .finally(() => setLoading(false));
  }

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
          rules={[
            { required: true, message: "Please input your sending account" },
          ]}
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
            options={cusAccounts}
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
            options={accounts.filter(
              (acc) =>
                !cusAccounts.map((cacc) => cacc.value).includes(acc.value)
            )}
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

export default Transfer;
