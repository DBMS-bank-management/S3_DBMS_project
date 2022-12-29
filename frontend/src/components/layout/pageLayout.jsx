import React from "react";
import { Breadcrumb, Layout, Menu, Button, Row } from "antd";
import { BreadcrumbsFromPath } from "../breadCrumbsFromPath";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import {
  navigateToCustomerPortal,
  navigateToEmployeePortal,
} from "../../utils/navigation";
const { Header, Content, Footer } = Layout;

const GeneralPageLayout = () => {
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/" + e.item.props.path);
  };

  return (
    <Layout className="layout" style={{}}>
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
          <div style={{ flex: 0.8, justifyContent: "flex-start" }}>
            <Menu
              className="transparent"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={[
                {
                  key: "home",
                  label: "Home",
                  path: "",
                },
                {
                  key: "contact Us",
                  label: "Contact Us",
                  path: "contact",
                },
              ]}
              //   items={new Array(15).fill(null).map((_, index) => {
              //     const key = index + 1;
              //     return {
              //       key,
              //       label: `nav ${key}`,
              //       path:
              //     };
              //   })}
              onClick={onClick}
            />
          </div>
          <div
            style={{
              display: "flex",
              flex: 0.2,
              justifyContent: "flex-end",
              direction: "row",
              alignSelf: "center",
            }}
          >
            <Button
              // type="primary"
              type="link"
              style={{ justifySelf: "flex-end" }}
              onClick={navigateToEmployeePortal}
            >
              Employee portal
            </Button>
            {/* TODO add profile view */}
            <Button
              // type="primary"
              type="link"
              style={{ justifySelf: "flex-end" }}
              onClick={navigateToCustomerPortal}
            >
              Customer portal
            </Button>
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: 50,
          backgroundColor: "#FFFFFFd",
          minHeight: "100%",
        }}
      >
        {/* <BreadcrumbsFromPath /> */}
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Created by CSE DBMS group - for BANK A
      </Footer>
    </Layout>
  );
};
export default GeneralPageLayout;
// import logo from "../logo.svg";
// import "../App.css";
// import { Button } from "antd";
// import { employeeLogout } from "../api";
// import EmployeePageLayout from "../components/employeePageLayout";

// function Home() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <button onClick={() => console.log("test")}>test</button>
//         <a
//           className="App-link"
//           href="/employee-portal"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Employee portal
//         </a>
//         <Button onClick={employeeLogout}>employeeLogout</Button>
//       </header>
//     </div>
//   );
// }

// export default Home;
