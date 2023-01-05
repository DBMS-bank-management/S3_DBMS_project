import React, { useState } from "react";
import { Select } from 'antd';
import { addTransaction } from "../../../api/transaction";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import { Button, Checkbox, Form, Input } from 'antd';

const handleChange = (value) => {
  console.log(`selected ${value}`);
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
    >

      <Form.Item


        label="From Account "
        name="From Account"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Select
          defaultValue="lucy"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={[
            {
              label: 'From Account',
              options: [
                {
                  label: 'Jack',
                  value: 'jack',
                },
                {
                  label: 'Lucy',
                  value: 'lucy',
                },
              ],
            },

          ]}
        />
      </Form.Item>
      <Form.Item


        label="To Account"
        name="To Account"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Select
          defaultValue="lucy"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={[
            {
              label: 'To Account',
              options: [
                {
                  label: 'Jack',
                  value: 'jack',
                },
                {
                  label: 'Lucy',
                  value: 'lucy',
                },
              ],
            },

          ]}
        />
      </Form.Item>


      <Form.Item


        label="Amount"
        name="Amount"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>

    </Form>
  </div>


);


export default AddTransaction;