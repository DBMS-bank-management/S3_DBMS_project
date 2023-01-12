import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import FDList from "./pages/employeePortal/fd/fdList";
import TransactionList from "./pages/employeePortal/transaction/transactionList";
import AddTransaction from "./pages/employeePortal/transaction/addTransaction";
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
import AddEmployee from "./pages/employeePortal/employee/addEmployee";
import { EditEmployee } from "./pages/employeePortal/employee/editEmployee";
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
import NormalApplicationsList from "./pages/employeePortal/normalApplication/normalApplicationList";
import { EditNormalApplication } from "./pages/employeePortal/normalApplication/editNormalApplication";
import AddNormalApplication from "./pages/employeePortal/normalApplication/addNormalApplication";
import OnlineApplicationsList from "./pages/employeePortal/onlineApplication/onlineApplicationList";
import { EditOnlineApplication } from "./pages/employeePortal/onlineApplication/editOnlineApplication";
import AddOnlineApplication from "./pages/employeePortal/onlineApplication/addOnlineApplication";
import AddAccount from "./pages/employeePortal/account/AddAccounts";
import LoanList from "./pages/employeePortal/loan/LoanList";
import AccountPlanList from "./pages/employeePortal/AccountPlans/AccountplanList";
import LoanPlanList from "./pages/employeePortal/Loanplan/LoanplanList";
import FdPlanList from "./pages/employeePortal/Fdplans/FdplanList";
import AnimationLayout from "./components/RouterAnimation";
import AddCustomer from "./pages/employeePortal/customer/AddCustomer";
import { OnlineLoanApplication } from "./pages/customerPortal/OnlineLoanApplications";
import CustomerAccountsList from "./pages/customerPortal/AccountsList";
import CustomerFixedDepositsList from "./pages/customerPortal/FixeDepositList";
import CustomerLoansList from "./pages/customerPortal/CustomerLoansList";
import CustomerPendingApplicationsList from "./pages/customerPortal/pendingLoanApplicationsList";
import WithdrawalList from "./pages/employeePortal/withdrawals/withdrawalList";
import AddWithdrawal from "./pages/employeePortal/withdrawals/addWithdrawal";
import { LoanPayment } from "./pages/customerPortal/LoanPayment";
import LateInstallmentsReport from "./pages/employeePortal/reports/LateInstallamentsReport";
import TotalTransactionsReport from "./pages/employeePortal/reports/TotalTransactionsReport";

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
              <Route element={<AnimationLayout />}>
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
                  {/* <Route path=":id" element={<EditUser />} /> */}
                  <Route path="add" element={<AddCustomer />} />
                </Route>

                <Route path="accounts/">
                  <Route path="" element={<AccountsList />} />
                  <Route path="add" element={<AddAccount />} />
                </Route>

                <Route path="loans/">
                  <Route path="" element={<LoanList />} />
                  <Route path="add" />
                </Route>

                <Route path="installments/">
                  <Route path="" element={<InstallmentList />} />
                  {/* <Route path="add" element={<OnlyManager></OnlyManager>} /> */}
                  {/* <Route path="pay" element={}/> */}
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
                  <Route path="add" element={<AddTransaction />} />
                </Route>

                <Route path="withdrawals/">
                  <Route path="" element={<WithdrawalList />} />
                  <Route path="add" element={<AddWithdrawal />} />
                </Route>

                <Route path="fixed-deposits/">
                  <Route path="" element={<FDList />} />
                  <Route path="add" element={<OnlyManager></OnlyManager>} />
                </Route>

                <Route path="normal-applications/">
                  <Route path="" element={<NormalApplicationsList />} />
                  <Route path="add" element={<AddNormalApplication />} />
                </Route>

                <Route path="online-applications/">
                  <Route path="" element={<OnlineApplicationsList />} />
                  <Route
                    path=":id"
                    element={
                      <OnlyManager>
                        <EditOnlineApplication />
                      </OnlyManager>
                    }
                  />
                  <Route path="add" element={<AddOnlineApplication />} />
                </Route>

                <Route path="employees/">
                  <Route path="" element={<EmployeeList />} />
                  <Route
                    path=":id"
                    element={
                      <OnlyManager>
                        <EditEmployee />
                      </OnlyManager>
                    }
                  />
                  <Route path="add" element={<AddEmployee />} />
                </Route>

                <Route path="activity-logs/">
                  <Route path="" element={<LogsList />} />
                </Route>
                <Route path="account-plans/">
                  <Route path="" element={<AccountPlanList />} />
                </Route>
                <Route path="loan-plans/">
                  <Route path="" element={<LoanPlanList />} />
                </Route>

                <Route path="fixed-deposit-plans/">
                  <Route path="" element={<FdPlanList />} />
                </Route>
              </Route>

              <Route path="total-transactions-report" element={<OnlyManager><TotalTransactionsReport /></OnlyManager>} />
              <Route path="late-installments-report" element={<OnlyManager><LateInstallmentsReport /></OnlyManager>} />
            </Route>

            {/* CUSTOMER PORTAL ROUTES */}

            <Route path="customer-portal" element={<CustomerPageLayout />}>
              <Route element={<AnimationLayout />}>
                <Route path="" element={<CustomerDashboard />} />
                <Route
                  path="online-loan-application"
                  element={<OnlineLoanApplication />}
                />
                <Route path="accounts" element={<CustomerAccountsList />} />
                <Route path="fd" element={<CustomerFixedDepositsList />} />
                <Route path="Loans" element={<CustomerLoansList />} />
                <Route
                  path="pending-normal-loans"
                  element={<CustomerPendingApplicationsList />}
                />
                <Route path="loan-payment" element={<LoanPayment />} />
              </Route>
            </Route>

            {/* PUBLIC ROUTES */}
            <Route element={<AnimationLayout />}>
              <Route exact path="employee-login" element={<EmployeeLogin />} />
              <Route path="customer-login" element={<CustomerLogin />} />
              <Route exact path="/" element={<GeneralPageLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="contact" element={<Contact />} />
              </Route>
              <Route path="*" element={<p>Invalid Route</p>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
