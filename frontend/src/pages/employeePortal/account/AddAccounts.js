import React, { useEffect, useState } from 'react';
import { Button, message, Steps } from 'antd';
import AccountsList from './accountsList';
import { Select } from 'antd';
import { getCustomers } from '../../../api/customer';


const AddAccount = () => {


    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState()

    useEffect(() => loadCustomersList(), []);

    function loadCustomersList() {
        getCustomers()
          .then((data) => {
            setCustomers(data.map(customer => ({...customer, value: customer.ID, label: `${customer.name} (${customer.ID}   )`})));
          })
          .catch((err) => alert(err));
      }


const onChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedCustomer(value)
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };


const steps = [
  {
    title: 'Select Customer',
    content: <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={customers}
  />
  },
  {
    title: 'Create Account',
    content: 'Second-content',
  },
  {
    title: 'Confirm',
    content: 'Last-content',
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
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default AddAccount;