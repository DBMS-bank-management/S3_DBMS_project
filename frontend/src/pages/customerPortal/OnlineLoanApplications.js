import { Button, InputNumber, Select, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { getSavingsAccountsByCustomer } from "../../api/account";
import { getFixedDepositsByID } from "../../api/fd";
import { getLoanPlans } from "../../api/loanplan";
// import { Form } from "react-router-dom";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";

export const OnlineLoanApplication = () => {
  const [loanplans, setLoanPlans] = useState();
  const [accounts, setAccounts] = useState([]);
  const [fixedDeposits, setFixedDeposits] = useState([]);
  const [selectedFd, setSelectedFd] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadFixedDepositsList(), []);

  useEffect(() => {
    setLoading(true);
    loadLoanPlanList();
    loadAccountsList();
    loadFixedDepositsList();
    setLoading(false);
  }, []);

  function loadLoanPlanList() {
    getLoanPlans()
      .then((data) => {
        setLoanPlans(
          data.map((plan) => ({ value: plan.plan_ID, label: plan.plan_ID }))
        );
      })
      .catch((err) => message.error(err));
  }

  function loadAccountsList() {
    getSavingsAccountsByCustomer()
      .then((data) => {
        setAccounts(
          data.map((acc) => ({ label: acc.account_ID, value: acc.account_ID }))
        );
      })
      .catch((err) => alert(err));
  }

  function loadFixedDepositsList() {
    getFixedDepositsByID()
      .then((data) => {
        setFixedDeposits(data);
      })
      .catch((err) => alert(err));
  }

  const onFinish = (values) => {
    console.log({ values });
  };

  return (
    <>
      <CustomerPageHeading text={"Online loans"} />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Fixed deposit"
          name="fd_ID"
          rules={[{ required: true, message: "Please select a fixed deposit" }]}
        >
          <Select
            // initialValues="lucy"
            // style={{
            //   width: 200,
            // }}
            showSearch
            filterOption={
              (input, option) => option.label === input
              // (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={fixedDeposits.map((fd) => ({
              label: `account: ${fd.acc_ID} - (Rs. ${fd.amount})`,
              value: fd.fd_ID,
            }))}
            onChange={(value) => setSelectedFd(value)}
          />
        </Form.Item>
        <Form.Item
          label="Savings account"
          name="acc_ID"
          rules={[
            { required: true, message: "Please select a savings account" },
          ]}
        >
          <Select
            // defaultValue="lucy"
            // style={{
            //   width: 200,
            // }}
            showSearch
            filterOption={
              (input, option) => option.label === input
              // (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={accounts}
          />
        </Form.Item>
        <Form.Item
          label="Loan plan"
          name="loan_plan"
          rules={[{ required: true, message: "Please select a loan plan" }]}
        >
          <Select
            // defaultValue="lucy"
            // style={{
            //   width: 200,
            // }}
            showSearch
            filterOption={
              (input, option) => option.label === input
              // (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={loanplans}
          />
        </Form.Item>

        <Form.Item
          label="Amount (Please select a fixed deposit first)"
          name="Amount"
          rules={[
            { required: true, message: "Please input amount" },
            // {
            //   max:
            //     0.6 *
            //     fixedDeposits.find((fd) => {
            //       // console.log({ selectedFd, fd: fd.fd_ID });
            //       return fd.fd_ID == selectedFd;
            //     })?.amount,
            //   message: !selectedFd
            //     ? "Please select a fixed deposit first"
            //     : "Please enter value less than ${max}",
            // },
          ]}
        >
          <InputNumber
            disabled={!selectedFd}
            max={
              0.6 *
                fixedDeposits.find((fd) => {
                  // console.log({ selectedFd, fd: fd.fd_ID });
                  return fd.fd_ID == selectedFd;
                })?.amount || 0
            }
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
