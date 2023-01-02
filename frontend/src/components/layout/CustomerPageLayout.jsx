import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { BreadcrumbsFromPath } from "../breadCrumbsFromPath";
import { isAuthenticatedCustomer } from "../../api/authentication";

const { Header, Content, Footer } = Layout;

const CustomerPageLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const authenticated = isAuthenticatedCustomer();

  return authenticated ? (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <BreadcrumbsFromPath />
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Designed and built by DBMS group
      </Footer>
    </Layout>
  ) : (
    <Navigate to="/customer-login" />
  );
};

export default CustomerPageLayout;
