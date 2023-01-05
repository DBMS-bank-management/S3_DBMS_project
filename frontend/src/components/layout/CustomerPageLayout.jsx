import React , {useState} from "react";
import { Breadcrumb, Button, Card, Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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

  const items = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Navigation Two",
      key: "app",
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: "alipay",
    },
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

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
          <div style={{ color: "white", flex: 0.15, fontSize:20 }}>Customer portal</div>
          <div style={{ flex: 0.85, justifyContent: 'center' }}>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              theme="dark"
              items={items}
            />
            {/* <Menu
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={new Array(15).fill(null).map((_, index) => {
                const key = index + 1;
                return {
                  key,
                  label: `nav ${key}`,
                };
              })}
            /> */}
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
