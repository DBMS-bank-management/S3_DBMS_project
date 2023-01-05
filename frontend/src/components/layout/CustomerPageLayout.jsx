import React from "react";
import { Breadcrumb, Button, Card, Layout, Menu, theme } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { BreadcrumbsFromPath } from "../breadCrumbsFromPath";
import {
  customerLogout,
  isAuthenticatedCustomer,
} from "../../api/authentication";
import { Profile } from "../profile";

const { Header, Content, Footer } = Layout;

const CustomerPageLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const authenticated = isAuthenticatedCustomer();

  return authenticated ? (
    <Layout className="layout login" style={{ minHeight: "100vh" }}>
      <Header>
        <div className="logo" />
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
          </div>
          <div style={{ flex: 0.05 }}>
            <Profile
              type={"customer"}
              LogoutButton={
                <Button
                  type="primary"
                  style={{ justifySelf: "flex-end" }}
                  onClick={customerLogout}
                >
                  Logout
                </Button>
              }
            />

            {/* TODO add profile view */}
          </div>
        </div>
      </Header>
      <Content style={{ padding: "10px", minHeight: "100%" }}>
        <Card
          className="glass"
          style={{ minHeight: "max-content", padding: "0 50px" }}
        >
          <BreadcrumbsFromPath />

          <Outlet />
        </Card>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        Designed and built by DBMS group 8
      </Footer>
    </Layout>
  ) : (
    <Navigate to="/customer-login" />
  );
};

export default CustomerPageLayout;
