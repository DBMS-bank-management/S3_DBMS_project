import React from "react";
import { Typography, Layout, Card, Col, Row, Statistic, Divider } from "antd";
import { isEmployee, isManager } from "../../api";
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
    <Layout style={{ height: '100%' }} className="transparent">
      {/* <Header> */}
      <Typography className="page-heading">
        {isManager()
          ? "Manager Dashboard"
          : isEmployee()
          ? "Employee Dashboard"
          : null}
      </Typography>
      {/* </Header> */}
      <Divider />
      <Content className="transparent">
        <Row gutter={16}>
          <Col span={6}>
            <Card className="glass center-content" hoverable>
              <Statistic title="Customers" value={10} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="glass center-content" hoverable>
              <Statistic title="Total in accounts" value={112893}/>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="glass center-content" hoverable>
              <Statistic title="Customers" value={10} />
            </Card>
          </Col>
          <Col span={6}>
            <Card className="glass center-content" hoverable>
              <Statistic title="Total in accounts" value={112893} />
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]} style={{ paddingTop: 0 }}>
          {cols}
        </Row>
      </Content>
    </Layout>
    // </Card>
  );
};
