import React from "react";
import { Typography, Layout, Card } from "antd";
import { isEmployee, isManager } from "../../api";

const { Header, Footer, Sider, Content } = Layout;

export const Dashboard = () => {
  return (
    // <Card className="glass">
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Typography>
          {isManager()
            ? "Manager Dashboard"
            : isEmployee()
            ? "Employee Dashboard"
            : null}
        </Typography>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
    // </Card>
  );
};
