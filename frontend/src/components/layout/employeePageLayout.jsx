import React, { Children, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BankOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Typography, Button, Card } from "antd";
import { BreadcrumbsFromPath } from "../breadCrumbsFromPath";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { flatternList } from "../../utils/list";
import {
  isAuthenticatedEmployee,
  employeeLogout,
} from "../../api/authentication";
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

const EmployeePageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  // const [selected, setSelected] = useState("");
  const [openKey, setOpenKey] = useState();

  const authenticated = isAuthenticatedEmployee();

  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/employee-portal" + e.item.props.path);
  };

  function getItem(label, key, path, icon, children) {
    return {
      key,
      icon,
      children,
      label,
      path,
      onTitleClick: () => (openKey == key ? setOpenKey() : setOpenKey(key)),
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
      getItem("Customers", "8", "/customers"),
    ]),
    getItem("Accounts", "accounts", "/", <DollarOutlined />, [
      getItem("Accounts", "7", "/accounts"),
      getItem("Installments", "10", "/installments"),
      getItem("Transactions", "11", "/transactions"),
      getItem("Fixed Deposits", "12", "/fixed-deposits"),
      getItem("Loans", "13","/loans"),
    ]),
    getItem("Applications", "sub3", "/", <TeamOutlined />, [
      getItem("Normal Applications", "15", "/normal-applications"),
      getItem("Online Applications", "16", "/online-applications"),
    ]),
    getItem("Log", "9", "/activity-logs", <FileOutlined />),
  ];

  return authenticated ? (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      className="login"
    >
      <Header
        style={{
          padding: 0,
          width: "100%",
          // backgroundColor:'red'
        }}
      >
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexDirection: "row",
            flex: 1,
            width: "100%",
          }}
        >
          <div style={{ flex: 0.95 }}>
            <Typography
              // style={{ justifySelf: "flex-start" }}
              className="Header-text"
            >
              Employee Portal
            </Typography>
          </div>
          <div style={{ flex: 0.05 }}>
            <Button
              type="primary"
              style={{ justifySelf: "flex-end" }}
              onClick={employeeLogout}
            >
              Logout
            </Button>
            {/* TODO add profile view */}
          </div>
        </div>
      </Header>

      <Layout className="site-layout transparent" style={{ minHeight: "100%" }}>
        <Sider
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          // className="glass"
          // aria-expanded={true}
          // collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          onMouseEnter={() => setCollapsed(false)}
          onMouseLeave={() => setTimeout(() => setCollapsed(true), 50)}
          className="transparent glass"
          theme="light"
        >
          <div className="logo" />
          <Menu
            className="transparent"
            openKeys={
              collapsed
                ? []
                : items
                    .filter((item) => !!item.children)
                    .map((item) => item.key)
            }
            // className="glass"
            //  inlineIndent={}
            theme="light"
            // defaultSelectedKeys={["1"]}
            selectable
            selectedKeys={flatternList(items)
              .filter((a) => {
                return a.path == "/"
                  ? window.location.pathname == "/employee-portal/"
                  : window.location.pathname.includes(
                      "/employee-portal" + a.path
                    );
              })
              .map((a) => a.key)}
            // disabled={collapsed}

            mode="inline"
            items={items}
            onClick={onClick}
            triggerSubMenuAction="hover"
            subMenuCloseDelay={0}
            // inlineCollapsed={true}
          />
        </Sider>
        <Content
          style={{
            // margin: "10px",
            minHeight: "100%",
            padding: 10,
            // backgroundColor: 'green'
          }}
        >
          <Card className="glass" style={{ minHeight: "100%" }}>
            <BreadcrumbsFromPath />
            <Outlet />
          </Card>
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
    <Navigate to="/employee-login" />
  );
};
export default EmployeePageLayout;
