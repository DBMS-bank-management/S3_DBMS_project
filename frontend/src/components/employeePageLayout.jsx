import React, { Children, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import { BreadcrumbsFromPath } from "./breadCrumbsFromPath";
import { Navigate, useNavigate } from "react-router-dom";
import { flatternList } from "../utils/list";
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
  getItem("Option 2", "2", "/", <DesktopOutlined />),
  getItem("User", "sub1", "/", <UserOutlined />, [
    getItem("Tom", "3", "/'"),
    getItem("Bill", "4", "/"),
    getItem("Alex", "5", "/"),
  ]),
  getItem("Users", "sub2", "/", <TeamOutlined />, [
    getItem("Employees", "6", "/users"),
    getItem("Customers", "8", "/users/add-user"),
  ]),
  getItem("Files", "9", "/", <FileOutlined />),
];

const EmployeePageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState("");

  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    navigate("/employee-portal" + e.item.props.path);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
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
              console.log(
                a,
                "employee-portal" + a.path,
                window.location.pathname
              );
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
          {children}
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
  );
};
export default EmployeePageLayout;
