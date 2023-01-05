import React, { useEffect, useState } from 'react';
import { Button, Form, message,Input, InputNumber,Steps } from 'antd';
import { Select } from 'antd';
import { addNormalApplication } from '../../../api/normalApplication';


const AddNormalApplication= () => {

    const [formData, setFormData] = useState();
  function submitData() {
    addNormalApplication(formData)
      .catch((err) => message.error(err));
  }

  const onFinish = (values) => {
    submitData();
    console.log("Success:", values);
  };


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} onValuesChange={(values) => {
        console.log({values, formData})
        setFormData({...formData, ...values})}}>
      <Form.Item
        name={'acc_ID'}
        label="Account ID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'amount'}
        label="Amount"
        rules={[
          {
            type: 'number',
            // min: 0,
            // max: 9999,
          },
        ]}
      >
         <InputNumber/>
      </Form.Item>
      <Form.Item
        name={'plan_ID'}
        label="Loan Plan"
        rules={[
          {
           required: true,
          },
        ]}
      >
         <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={[
      {
        value: 'Housing',
        label: 'housing',
      },
      {
        value: 'Personal',
        label: 'personal',
      },
    ]}
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
  );
};
export default AddNormalApplication

