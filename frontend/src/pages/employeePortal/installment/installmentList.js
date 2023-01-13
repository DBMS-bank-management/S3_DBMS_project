import { Button, Card, Space, Table, message, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  deleteInstallment,
  getInstallments,
  payInstallmentByCash,
} from "../../../api/installment";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import LoanPaymentDialog from "../../../components/LoanPaymentDialog";
import SearchableTable from "../../../components/SearchableTable";

const InstallmentList = () => {
  const [installments, setInstallments] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => loadInstallmentList(), []);

  const onDelete = (id) => {
    deleteInstallment(id);
    loadInstallmentList();
  };

  function loadInstallmentList() {
    getInstallments()
      .then((data) => {
        setInstallments(data);
      })
      .catch((err) => message.error(err))
      .finally(() => setLoading(false));
  }

  const onLoanPay = (id) => {
    payInstallmentByCash(id)
      .then(() => {
        loadInstallmentList();
        message.success("Installment payment successful");
      })
      .catch((err) => {
        console.error(err);
        message.error("Couldn't complete installment payment!");
      });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "inst_ID",
      key: "inst_ID",
    },
    {
      title: "loan ID",
      dataIndex: "loan_ID",
      key: "loan_ID",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Due date",
      dataIndex: "due_date",
      key: "due_date",
    },
    {
      title: "Status",
      dataIndex: "is_paid",
      key: "is_paid",
      render: (_, record) => (
        <Space size="middle" key={record.app_ID}>
          {record.is_paid == 1 && <Tag color="success">Paid</Tag>}
          {record.is_paid == 0 && new Date(record.due_date) <= new Date() && (
            <Tag color="error">Late</Tag>
          )}
          {record.is_paid == 0 && new Date(record.due_date) > new Date() && (
            <Tag color="warning">unpaid</Tag>
          )}

          {/* <Button href={`normalApplications/${record.app_ID}`} type="link">
              Edit
            </Button>
              <ConfirmationDialog
                buttonProps={{ type: "link", danger: true }}
                onOk={() => {
                  onDelete(record.app_ID);
                }}
              /> */}
        </Space>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "trans_ID",
      key: "trans_ID",
    },
    {
      title: "Extra Action",
      key: "extra_action",
      render: (_, record) => (
        <Space size="middle" key={record.inst_id}>
          {!record.is_paid && (
            <Button onClick={() => onLoanPay(record.inst_ID)}>pay</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ width: "100%" }}>
      <EmployeePageHeading text={"Installments"} />
      {/* <Button href="installments/add">Add installment</Button> */}
      <SearchableTable loading={loading} dataSource={installments} columns={columns} bordered />
    </Card>
  );
};

export default InstallmentList;
