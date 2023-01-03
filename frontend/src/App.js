import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import TransactionList from "./pages/employeePortal/transaction/transactionList";
import CustomersList from "./pages/employeePortal/customer/customerList";
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
import LogsList from "./pages/employeePortal/Log/logList";
import EmployeeLogin from "./pages/employeePortal/EmployeeLogin";
import { Dashboard } from "./pages/employeePortal/EmployeeDashboard";
import { OnlyManager } from "./components/roleBasedRoute";
import CustomerLogin from "./pages/customerPortal/CustomerLogin";
import CustomerDashboard from "./pages/customerPortal/CustomerDashboard";
import CustomerPageLayout from "./components/layout/CustomerPageLayout";
import AccountsList from "./pages/employeePortal/account/accountsList";
import InstallmentList from "./pages/employeePortal/installment/installmentList";

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
            {/* EMPLOYEE PORTAL ROUTES*/}
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

              <Route path="customers/">
                <Route path="" element={<CustomersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="add" element={<AddUser />} />
              </Route>

              <Route path="accounts/">
                <Route path="" element={<AccountsList />} />
                <Route
                  path="add"
                  element={
                    <OnlyManager>
                    </OnlyManager>
                  }
                />
              </Route>

              <Route path="installments/">
                <Route path="" element={<InstallmentList />} />
                <Route
                  path="add"
                  element={
                    <OnlyManager>
                    </OnlyManager>
                  }
                />              
              </Route>

              <Route path="branches/">
                <Route path="" element={<BranchesList />} />
                <Route
                  path="add"
                  element={
                    <OnlyManager>
                      <AddBranch />
                    </OnlyManager>
                  }
                />
              </Route>
              <Route path="transactions/">
                <Route path="" element={<TransactionList />} />
                <Route
                  path="add"
                  element={
                    <OnlyManager>
                    </OnlyManager>
                  }
                />
              </Route>
              <Route path="employees/">
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
              <Route path="activitylogs/">
                <Route path="" element={<LogsList />} />
              </Route>
            </Route>
            {/* CUSTOMER PORTAL ROUTES */}

            <Route path="customer-portal" element={<CustomerPageLayout />}>
              <Route path="" element={<CustomerDashboard />} />
            </Route>

            {/* PUBLIC ROUTES */}
            <Route exact path="employee-login" element={<EmployeeLogin />} />
            <Route path="customer-login" element={<CustomerLogin />} />
            <Route exact path="/" element={<GeneralPageLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<p>Invalid Route</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
