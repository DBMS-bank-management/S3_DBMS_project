import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  message,
  Steps,
  Typography,
  Select,
  Input,
  Checkbox,
  Radio,
  Descriptions,
  Divider,
  InputNumber,
} from "antd";
import { getCustomers } from "../../../api/customer";
import { capitalize } from "../../../utils/string";
import { getAccountPlans } from "../../../api/accountplan";
import { responseErrorHandler } from "../../../utils/responseErrorHandler";
import { addAccount } from "../../../api/account";
import { getLoggedInEmployeeBranch } from "../../../api/authentication";
import { useNavigate } from "react-router-dom";
import { NavigateButton } from "../../../components/NavigateButton";

const AddAccount = () => {
  const [customers, setCustomers] = useState([]);
  const [accountPlans, setAccountPlans] = useState([]);
  const [formValues, setFormValues] = useState({ plan: null, deposit: null });
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedPlan, setSelectedPlan] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomersList();
    loadAccountPlansList();
  }, []);

  function loadCustomersList() {
    getCustomers()
      .then((data) => {
        setCustomers(
          data.map((customer) => ({
            ...customer,
            value: customer.ID,
            label: `${customer.name} (${customer.ID}   )`,
          }))
        );
      })
      .catch(responseErrorHandler);
  }

  const loadAccountPlansList = () => {
    getAccountPlans()
      .then((data) => {
        setAccountPlans(data);
      })
      .catch(responseErrorHandler);
  };

  const onProcessDone = async () => {
    const branchId = await getLoggedInEmployeeBranch();
    addAccount({
      account_id: Math.round(Math.random() * 100000000),
      balance: formValues.deposit,
      plan_id: formValues.plan,
      branch_id: branchId,
      customer_id: selectedCustomer,
    }).then(() => {
      navigate("/employee-portal/accounts");
    });
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedCustomer(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const min = selectedPlan && accountPlans.filter(pl => pl.plan_ID == selectedPlan)[0]?.min_amount || 0

  console.log({selectedPlan, min})

  const steps = [
    {
      title: "Select Customer",
      subTitle: "Select the customer to whom the account should be created",
      content: (
        <div className="center-content" style={{ flexDirection: "column" }}>
          <Form layout="vertical" size="large">
            <Form.Item
              label="Select Customer"
              name="customer"
              rules={[
                {
                  required: true,
                  message:
                    "Please select the customer for whom the accounts is to be created!",
                },
              ]}
            >
              <Select
                style={{ width: 300 }}
                defaultValue={selectedCustomer}
                showSearch
                placeholder="Type username or name"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={customers}
              />
            </Form.Item>

            <Form.Item label="Add customer (for new customers)">
              <NavigateButton href="/employee-portal/customers/add">
                Add Customer
              </NavigateButton>
            </Form.Item>
          </Form>
          {/* <Typography className="center-content padding">
            Select customer
          </Typography> */}
        </div>
      ),
    },
    {
      title: "Create Account",
      content: selectedCustomer && (
        <div className="center-content" style={{ flexDirection: "column" }}>
          <Form
            size="large"
            layout="vertical"
            name="basic"
            // labelCol={{
            //   span: 8,
            // }}
            // wrapperCol={{
            //   span: 16,
            // }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={(values) =>
              setFormValues({ ...formValues, ...values })
            }
          >
            <Form.Item
              label="Select plan"
              name="plan"
              rules={[
                {
                  required: true,
                  message: "Please select the account plan!",
                },
              ]}
            >
              <Radio.Group
                onChange={(val) => setSelectedPlan(val.target.value)}
              >
                {accountPlans.map((plan) => (
                  <Radio.Button
                    value={plan.plan_ID}
                  >{`${plan.plan_ID} (${plan.type})`}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Initial deposit"
              name="deposit"
              rules={[
                {
                  type: 'number',
                },
                {
                  required: true,
                  message: "Please input the initial deposit!",
                },
                // { min: min }
              ]}
            >
              <InputNumber min={min}/>
            </Form.Item>
          </Form>
        </div>
      ),
      // disabled: true,
    },
    {
      title: "Confirm",
      content: selectedCustomer && (
        <div className="center-content" style={{ flexDirection: "column" }}>
          {/* {JSON.stringify(formValues)} */}
          <Descriptions title="Customer details" bordered>
            {Object.keys(
              customers
                .map((c) => ({
                  ID: c.ID,
                  name: c.name,
                  type: c.type,
                  contact_no: c.Contact_no,
                }))
                .find((c) => (c.ID = selectedCustomer))
            ).map((key) => (
              <Descriptions.Item label={capitalize(key)} span={4}>
                {customers.find((c) => (c.ID = selectedCustomer))[key]}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <Divider />
          <Descriptions title="Account details" bordered>
            {Object.keys(formValues).map((key) => (
              <Descriptions.Item label={capitalize(key)} span={4}>
                {formValues[key]}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <Card className="glass" bodyStyle={{ minHeight: "100%" }}>
      <Steps
        current={current}
        items={items}
        style={{ padding: "20px 100px" }}
      />
      <div className="steps-content fill center-content test">
        {steps[current].content}
      </div>
      <div
        className="steps-action"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
          padding: "0 100px",
        }}
      >
        {current < steps.length - 1 && (
          <Button
            style={{ justifySelf: "flex-end" }}
            type="primary"
            disabled={
              (current == 0 && !selectedCustomer) ||
              (current == 1 && (!formValues.plan || !formValues.deposit))
            }
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            style={{ backgroundColor: "green" }}
            type="primary"
            onClick={onProcessDone}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </Card>
  );
};
export default AddAccount;
