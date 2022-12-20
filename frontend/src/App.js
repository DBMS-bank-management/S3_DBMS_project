import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import "./App.css";
import { Contact } from "./pages/contact";
import Home from "./pages/home";
import AddUser from "./pages/employeePortal/user/addUser";
import UsersList from "./pages/employeePortal/user/usersList";
import { EditUser } from "./pages/employeePortal/user/editUser";
import EmployeePageLayout from "./components/layout/employeePageLayout";
import GeneralPageLayout from "./components/layout/pageLayout";
import BranchesList from "./pages/employeePortal/branch/branchesList";
import AddBranch from "./pages/employeePortal/branch/addBranch";
// import AddEmployee from "./pages/employeePortal/employee/addEmployee";
// import { EditEmployee } from "./pages/employeePortal/employee/editEmployee";
import EmployeeList from "./pages/employeePortal/employee/EmployeesList";
import EmployeeLogin from "./pages/employeePortal/EmployeeLogin";
import { Dashboard } from "./pages/employeePortal/Dashboard";
import { OnlyManager } from "./components/roleBasedRoute";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
        components: {
          Card: {
            // colorPrimary: "#00b96b",
            background: "rgba(255, 255, 255, 0.32)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(15.5px)",
            webkitBackdropFilter: "blur(15.5px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route exact path="employee-login" element={<EmployeeLogin />} />
            <Route
              exact
              path="/employee-portal/"
              element={<EmployeePageLayout />}
            >
              <Route exact path="" element={<Dashboard />} />
              <Route path="users/">
                <Route path="" element={<UsersList />} />
                <Route
                  path=":id"
                  element={
                    <OnlyManager>
                      <EditUser />
                    </OnlyManager>
                  }
                />
                <Route path="add" element={<AddUser />} />
              </Route>

              <Route path="branches">
                <Route path="" element={<BranchesList />} />
                {/* <Route
                  path="/employee-portal/branches/:id"
                  element={<EditBranch />}
                /> */}
                <Route
                  path="add"
                  element={
                    <OnlyManager>
                      <AddBranch />
                    </OnlyManager>
                  }
                />
              </Route>
              <Route path="employees">
                <Route path="" element={<EmployeeList />} />
                {/* <Route
                  path="/employee-portal/employees/:id"
                  element={<EditEmployee />}
                />
                <Route
                  path="/employee-portal/employees/add-employee"
                  element={<AddEmployee />}
                /> */}
              </Route>
            </Route>
            <Route exact path="/" element={<GeneralPageLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* <Route path="blogs" element={<Blogs />} /> */}

            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
