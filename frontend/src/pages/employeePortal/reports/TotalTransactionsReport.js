import { Card, message } from "antd";
import { useEffect, useState } from "react";
import { getTotalTransactionReport } from "../../../api/reports";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";
import SearchableTable from "../../../components/SearchableTable";
import { formatDate } from "../../../utils";

const TotalTransactionsReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTotalTransactionReport();
  }, []);

  const loadTotalTransactionReport = () => {
    getTotalTransactionReport()
      .then((data) => setData(data))
      .catch((err) => {
        console.error({ err });
        message.error("Couldnt load total transaction report!");
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "trans_ID",
      key: "trans_ID",
    },
    {
      title: "mode",
      dataIndex: "mode_ID",
      key: "mode_ID",
    },
    {
      title: "Account",
      dataIndex: "account_ID",
      key: "acc_ID",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (date) => <div>{formatDate(date)}</div>,
    },
  ];

  return (
    <div>
      <EmployeePageHeading text={"Total transactions report"} />
      <Card>
        <SearchableTable dataSource={data} columns={columns} />
      </Card>
    </div>
  );
};

export default TotalTransactionsReport;
