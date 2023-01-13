import { Button, Card, Form, message, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getAccountsByID } from "../../api/account";
import { getInstallmentsByCustomerId } from "../../api/installment";
import ConfirmationDialog from "../../components/confirmationDialog";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";
import LoanPaymentDialog from "../../components/LoanPaymentDialog";
import SearchableTable from "../../components/SearchableTable";
import { formatDate } from "../../utils";

export const LoanPayment = () => {
  const [installments, setInstallments] = useState();
  const [accounts, setAccounts] = useState()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadInstallmentList();
    loadAccountsList()
  }, []);

  function loadInstallmentList() {
    getInstallmentsByCustomerId()
      .then((data) => {
        setInstallments(data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => message.error(err));
  }

  function loadAccountsList() {
    getAccountsByID()
      .then((data) => {
        setAccounts(
          data.map((acc) => ({ label: acc.account_ID, value: acc.account_ID }))
        );
      })
      .catch((err) => alert(err));
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
      sorter: (a, b) => a.loan_ID - b.loan_ID,
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
      render: (date) => <div>{formatDate(date)}</div>,

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
        <Space size="middle" key={record.app_ID}>
          {!record.is_paid && (
            <LoanPaymentDialog accounts={accounts} installment={record} onSuccess={loadInstallmentList}/>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <CustomerPageHeading text={"Loan payments"} />
      <Card style={{ width: "100%" }}>
        <SearchableTable
          loading={loading}
          dataSource={installments}
          columns={columns}
          bordered
        />
      </Card>
    </>
  );
};
