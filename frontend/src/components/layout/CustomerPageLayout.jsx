import React, { useState } from "react";
import { Breadcrumb, Button, Card, Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  DollarOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { BreadcrumbsFromPath } from "../breadCrumbsFromPath";
import {
  customerLogout,
  isAuthenticatedCustomer,
} from "../../api/authentication";
import { Profile } from "../profile";
import { Logo } from "../logo";

const { Header, Content, Footer } = Layout;

const CustomerPageLayout = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const authenticated = isAuthenticatedCustomer();

  const items = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
      onClick: () => {
        navigate("/customer-portal");
      },
    },
    {
      label: "Assets",
      key: "SubMenuAssets",
      icon: <DollarOutlined />,
      children: [
        {
          label: "Accounts",
          key: "accounts",
          onClick: () => {
            navigate("/customer-portal/accounts");
          },
        },
        {
          label: "Fixed deposits",
          key: "fixedDeposits",
          onClick: () => {
            navigate("/customer-portal/fd");
          },
        },
      ],
    },
    {
      label: "Liabilities",
      key: "SubMenuLiabilities",
      icon: <MoneyCollectOutlined />,
      children: [
        {
          label: "Loans",
          key: "loans",
          onClick: () => {
            navigate("/customer-portal/loans");
          },
        },
        {
          label: "Pending loan applications",
          key: "pendingLoanApplications",
          onClick: () => {
            navigate("pending-normal-loans");
          },
        },
      ],
    },

    {
      label: "Services",
      key: "submenuservices",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: "Transfer money",
          key: "loanPayment",
          // icon: <AppstoreOutlined />,
          // disabled: true,
          onClick: () => {
            navigate("/customer-portal/transfer");
          },
        },
        {
          label: "Pay for loan",
          key: "transfers",
          // icon: <AppstoreOutlined />,
          // disabled: true,
          onClick: () => {
            navigate("/customer-portal/loan-payment");
          },
        },
        {
          label: "Apply for a loan",
          key: "onlineLoanApplication",
          // icon: <AppstoreOutlined />,
          // disabled: true,
          onClick: () => {
            navigate("/customer-portal/online-loan-application");
          },
        },
      ],
    },
  ];

  const [current, setCurrent] = useState();
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return authenticated ? (
    <Layout className="layout login" style={{ minHeight: "100vh" }}>
      <Header style={{ padding: 0 }}>
        {/* <div className="logo" /> */}
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexDirection: "row",
            flex: 1,
            width: "100vw",
          }}
        >
          {" "}
          <div style={{ color: "white", flex: 0.3, fontSize: 22 }}>
            <Logo />
          </div>
          <div
            style={{ color: "white", flex: 0.15, fontSize: 20 }}
            onClick={() => navigate("/customer-portal")}
          >
            Customer portal
          </div>
          <div style={{ flex: 0.55, justifyContent: "center" }}>
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
