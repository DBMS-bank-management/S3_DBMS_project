import React, { useEffect, useState } from "react";
import { Button, Form, message, Input, InputNumber, Steps } from "antd";
import { Select } from "antd";
import { addNormalApplication } from "../../../api/normalApplication";
import { getLoanPlans } from "../../../api/loanplan";
import { getAccounts } from "../../../api/account";
import { useNavigate } from "react-router-dom";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const AddNormalApplication = () => {
  const [loanplans, setLoanPlans] = useState();
  const [accounts, setAccounts] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function submitData(values) {
    console.log("normal application values", values);
    addNormalApplication(values)
      .then(() => {
        navigate("/employee-portal/normal-applications");
      })
      .catch((err) => message.error(err));
  }

  useEffect(() => {
    setLoading(true);
    loadLoanPlanList();
    loadAccountsList();
    setLoading(false);
  }, []);

  function loadLoanPlanList() {
    getLoanPlans()
      .then((data) => {
        setLoanPlans(
          data.map((plan) => ({ label: plan.plan_ID, value: plan.plan_ID }))
        );
      })
      .catch((err) => message.error(err));
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

  const onFinish = (values) => {
    submitData(values);
    console.log("Success:", values);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  // /* eslint-disable no-template-curly-in-string */
  // const validateMessages = {
  //   required: "${label} is required!",
  //   types: {
  //     email: "${label} is not a valid email!",
  //     number: "${label} is not a valid number!",
  //   },
  //   number: {
  //     range: "${label} must be between ${min} and ${max}",
  //   },
  // };
  /* eslint-enable no-template-curly-in-string */

  return (
    <>
      <EmployeePageHeading text={"Loan application"} />
      <Form size="large" {...layout} name="nest-messages" onFinish={onFinish}>
        <Form.Item
          name={"acc_ID"}
          label="Account ID"
          rules={[
            {
              required: true,
              message: "Account is required",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select an account"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={accounts}
          />
        </Form.Item>
        <Form.Item
          name={"amount"}
          label="Amount"
          rules={[
            {
              type: "number",
              // min: 0,
              // max: 9999,
            },
            {
              required: "true",
              message: "Amount is required",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={"plan_ID"}
          label="Loan Plan"
          rules={[
            {
              required: true,
              message: "Plan is required",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a plan"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={loanplans}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddNormalApplication;
