import React from "react";
import {
  Typography,
  Layout,
  Card,
  Col,
  Row,
  Statistic,
  Divider,
  Button,
  message,
} from "antd";
import { isEmployee, isManager } from "../../api/authentication.js";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { EmployeePageHeading } from "../../components/layout/employeePageHeading";
import { calculateAndAddInterestsForMonth } from "../../api/account.js";
import NormalApplicationsList from "./normalApplication/normalApplicationList.js";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

const total_account_data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const user_growth_data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const charts = [
    {
      title: "User growth",
      children: (
        // <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={300}
          height={200}
          data={user_growth_data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        // </ResponsiveContainer>
      ),
    },
    {
      title: "Accounts total growth",
      children: (
        // <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={200}
          data={total_account_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        // </ResponsiveContainer>
      ),
    },
  ];

  const cols = [];
  const colCount = 2;
  let colCode = "";
  charts.map((chart) => {
    cols.push(
      <Col key={chart.title} span={24 / colCount}>
        <Card title={chart.title} hoverable className="glass transparent">
          <div
            style={{
              // height: 200,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {chart.children}
          </div>
        </Card>
      </Col>
    );
    colCode += `  <Col span={${24 / colCount}} />\n`;
  });

  return (
    // <Card className="glass">
    <Layout style={{ height: "100%" }} className="transparent">
      {/* <Header> */}
      <EmployeePageHeading
        text={
          isManager()
            ? "Manager Dashboard"
            : isEmployee()
            ? "Employee Dashboard"
            : null
        }
      />

      {isManager() && (
        <>
          <Divider />
          <Button
            // disabled={isManager()}
            color="primary"
            onClick={() =>
              calculateAndAddInterestsForMonth()
                .then(() => message.success("Successfully updated insterests"))
                .catch((err) => message.error("Failed to update interests!"))
            }
          >
            Calculate and add interests for the month
          </Button>
        </>
      )}

      {/* </Header> */}
      <Divider />
      <Content className="transparent">
        {isEmployee() && (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card
                className="glass center-content"
                hoverable
                onClick={() => {
                  navigate("/employee-portal/transactions/add");
                }}
              >
                Transfers
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="glass center-content"
                hoverable
                onClick={() => {
                  navigate("/employee-portal/withdrawals/add");
                }}
              >
                Withdrawals
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="glass center-content"
                hoverable
                onClick={() => {
                  navigate("/employee-portal/normal-applications/add");
                }}
              >
                Create Normal Loan Application
              </Card>
            </Col>
            <Col span={12}>
              <Card
                className="glass center-content"
                hoverable
                onClick={() => {
                  navigate("/employee-portal/installments/pay");
                }}
              >
                Installment payments
              </Card>
            </Col>
          </Row>
        )}
        <Divider />

        <Row gutter={[16, 16]} style={{ paddingTop: 0 }}>
          {/* {cols} */}
          {isManager() && (
            <Col span={24}>
              <Card
                className="glass"
                hoverable
                title={"Normal loan applications"}
              >
                <NormalApplicationsList />
              </Card>
            </Col>
          )}
        </Row>
      </Content>
    </Layout>
    // </Card>
  );
};
