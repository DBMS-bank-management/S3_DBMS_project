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
} from "antd";
import { getCustomers } from "../../../api/customer";
import { capitalize } from "../../../utils/string";

const AddAccount = () => {
  const [customers, setCustomers] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState();

  useEffect(() => loadCustomersList(), []);

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
      .catch((err) => alert(err));
  }

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
          </Form>
          {/* <Typography className="center-content padding">
            Select customer
          </Typography> */}
        </div>
      ),
    },
    {
      title: "Create Account",
      content: (
        <div className="center-content" style={{ flexDirection: "column" }}>
          <Form
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
              <Radio.Group>
                <Radio.Button value="optional">Optional</Radio.Button>
                <Radio.Button value>Required</Radio.Button>
                <Radio.Button value={false}>Hidden</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Initial deposit"
              name="deposit"
              rules={[
                {
                  required: true,
                  message: "Please input the initial deposit!",
                },
              ]}
            >
              <Input type="numeric" />
            </Form.Item>
          </Form>
        </div>
      ),
      // disabled: true,
    },
    {
      title: "Confirm",
      content: (
        <div className="center-content" style={{ flexDirection: "column" }}>
          {/* {JSON.stringify(formValues)} */}
          <Descriptions title="Customer details" bordered>
            {Object.keys(customers.map(c => ({ID: c.ID, name: c.name, type: c.type, "contact_no": c.Contact_no})).find((c) => (c.ID = selectedCustomer))).map(
              (key) => (
                <Descriptions.Item label={capitalize(key)} span={4}>
                  {customers.find((c) => (c.ID = selectedCustomer))[key]}
                </Descriptions.Item>
              )
            )}
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
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button
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
            type="primary"
            onClick={() => message.success("Processing complete!")}
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
