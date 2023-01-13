import { Card, message, Table } from "antd";
import { useEffect, useState } from "react";
import { getLateInstallmentsReport } from "../../../api/reports";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import { formatDate } from "../../../utils";

const LateInstallmentsReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLateInstallments();
  }, []);

  const loadLateInstallments = () => {
    getLateInstallmentsReport()
      .then((data) => setData(data))
      .catch((err) => {
        console.error({ err });
        message.error("Couldnt load late installements report!");
      })
      .finally(() => setLoading(false));
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
      title: "Account",
      dataIndex: "account_ID",
      key: "account_ID",
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
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "contact_no",
      dataIndex: "contact_no",
      key: "contact_no",
    },
  ];

  return (
    <div>
      <EmployeePageHeading text={"Late Installements Report"} />
      <Card>
        <Table loading={loading} columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default LateInstallmentsReport;
