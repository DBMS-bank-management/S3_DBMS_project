import React, { useEffect, useState } from "react";
import {
  InputNumber,
  message,
  Select,
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
} from "antd";
import { addWithdrawal, addWithdraw } from "../../../api/withdrawal";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import { getAccounts } from "../../../api/account";
import { getWithdrawalsCount } from "../../../api/transaction";

const onFinish = (formValues) => {
  addWithdraw(formValues)
    .then(() => {
      message.success("Withdrawal done");
    })
    .catch((err) => {
      console.log({ err });
      message.error("Withdrawal Error!");
    });
  console.log({ formValues });
};

const AddWithdrawal = () => {
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(true);
  const [withdrawalCount, setWithdrawalCount] = useState();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    getWithdrawalsCount(value)
      .then((data) => setWithdrawalCount(data))
      .catch((err) => message.error("Error retrieving withdrawals count"));
  };

  useEffect(() => {
    setLoading(true);
    loadAccountsList();
  }, []);

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

  console.log(withdrawalCount);

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
            onSelect={handleChange}
            options={accounts}
          />
        </Form.Item>
        {/* <Form.Item
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
        </Form.Item> */}

        <Form.Item
          label="Amount"
          name="Amount"
          rules={[{ required: true, message: "Please input initial deposit" }]}
        >
          <InputNumber />
        </Form.Item>
        <Typography
          style={{ width: "100%", textAlign: "center" }}
          type="danger"
        >{`Withdrawals count: ${withdrawalCount?.count}`}</Typography>
        {withdrawalCount?.count >= 5 && (
          <Typography style={{ textAlign: "center", color: "red" }}>
            Maximum transaction count reached
          </Typography>
        )}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            disabled={withdrawalCount?.count >= 5}
          >
            Done
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddWithdrawal;
