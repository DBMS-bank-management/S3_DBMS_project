import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { BreadcrumbsFromPath } from "../breadCrumbsFromPath";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
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
        <Menu
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
      </Header>
      <Content
        style={{
          padding: 50,
          backgroundColor: '#FFFFFFd',
          minHeight: '100%',
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
// import { logout } from "../api";
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
//         <Button onClick={logout}>logout</Button>
//       </header>
//     </div>
//   );
// }

// export default Home;