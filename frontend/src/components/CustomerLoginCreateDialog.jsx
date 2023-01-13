import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";
import { payInstallmentByAccount } from "../api/installment";
import { createOnlineAccount } from "../api/customer";

const CustomerLoginCreateDialog = ({ customer, onSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onOk = (values) => {
    console.log({ values });
    createOnlineAccount({
      customer_id: customer.ID,
      password: values.password,
    })
      .then(() => {
        setModalOpen(false);
        message.success("Successfully created online account for customer");
        onSuccess();
      })
      .catch((err) => {
        setModalOpen(false);
        message.error("Error creating online account for customer!");
      });
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Create online account</Button>
      <Modal
        title="Create online account"
        centered
        open={modalOpen}
        okButtonProps={{ hidden: true, disabled: true }}
        // onOk={() => {
        //   onOk();
        //   setModalOpen(false);
        // }}
        // okButtonProps={{ danger: true }}
        onCancel={() => setModalOpen(false)}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onOk}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input a password" }]}
          >
            <Input.Password />
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
      </Modal>
    </>
  );
};

export default CustomerLoginCreateDialog;
