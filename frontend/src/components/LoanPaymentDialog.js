import React, { useState } from "react";
import { Button, Form, message, Modal, Select } from "antd";
import { payInstallmentByAccount } from "../api/installment";

const LoanPaymentDialog = ({ installment, accounts, onSuccess }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const onPay = (values) => {
    payInstallmentByAccount({
      account: values.account,
      installment: installment.inst_ID,
    })
      .then(() => {
        setModalOpen(false);
        message.success("Successfully paid loan instalment");
        onSuccess()
      })
      .catch((err) => {
        setModalOpen(false);
        message.error("Error paying the loan installment");
      });
    // .finally(() => {
    //   setModalOpen(false);
    // });
  };

  return (
    <>
      <Button onClick={() => setModalOpen(true)}>Pay</Button>
      <Modal
        title="Pay"
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
          onFinish={onPay}
        >
          <Form.Item
            label="Account"
            name="account"
            rules={[{ required: true, message: "Please input your account" }]}
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
              //   onChange={handleChange}
              options={accounts}
            />
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

export default LoanPaymentDialog;
