import React, { Children, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import { BreadcrumbsFromPath } from "../breadCrumbsFromPath";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { flatternList } from "../../utils/list";
import { isAuthenticated } from "../../api";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, path, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    path,
  };
}
const items = [
  getItem("Dashboard", "1", "/", <PieChartOutlined />),
  getItem("Branches", "2", "/branches", <BankOutlined />),
  // getItem("User", "sub1", "/", <UserOutlined />, [
  //   getItem("Tom", "3", "/'"),
  //   getItem("Bill", "4", "/"),
  // ]),
  getItem("Users", "sub2", "/", <TeamOutlined />, [
    getItem("Users", "5", "/users"),
    getItem("Employees", "6", "/employees"),
    getItem("Customers", "8", "/users/add-user"),
  ]),
  getItem("Log", "9", "/", <FileOutlined />),
];

const EmployeePageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState("");

  const auth = isAuthenticated();

  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/employee-portal" + e.item.props.path);
  };

  return auth ? (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        aria-expanded={true}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <div className="logo" />
        <Menu
          //  inlineIndent={}
          theme="dark"
          // defaultSelectedKeys={["1"]}
          selectable
          selectedKeys={flatternList(items)
            .filter((a) => {
              return "/employee-portal" + a.path == window.location.pathname;
            })
            .map((a) => a.key)}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Typography className="Header-text">Employee Portal</Typography>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <BreadcrumbsFromPath />
          <Outlet />
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};
export default EmployeePageLayout;
