import { Button, Card, Space, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { deleteInstallment, getInstallments } from "../../../api/installment";
import ConfirmationDialog from "../../../components/confirmationDialog";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

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
      .catch((err) => message.error(err));
  }

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
        title: "Paid",
        dataIndex: "is_paid",
        key: "is_paid",
      },
      {
        title: "Transaction ID",
        dataIndex: "trans_ID",
        key: "trans_ID",
      },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button href={`installments/${record.inst_ID}`} type="link">
            Edit
          </Button>
          <ConfirmationDialog
            buttonProps={{ type: "link", danger: true }}
            onOk={() => {
              onDelete(record.inst_ID);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Installments"} />
      <Card style={{ width: "100%" }}>
        <Button href="installments/add">Add installment</Button>
        <Table dataSource={installments} columns={columns} bordered />
      </Card>
      </div>
  );
};

export default InstallmentList;
