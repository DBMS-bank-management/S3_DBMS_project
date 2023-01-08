import React, { useEffect, useState} from "react";
import { Typography, Layout, Card, Col, Row, Statistic, Divider } from "antd";
import { isEmployee, isManager } from "../../api/authentication";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";
import AccountsList from "./Accounts/dashboardAccountList";
import TransactionsList from "./Accounts/dashboardTransactionList";
import FixedDepositsList from "./Accounts/dashboardFDList";
const { Header, Footer, Sider, Content } = Layout;

export const CustomerDashboard = () => {

  const cols = [];
  const colCount = 2;
  let colCode = ""; 
  
  const [user, setUser] = useState({});
  const { err, setErr } = useState();

  const loadUserDetails = async () => {
    try {
      const user = await localStorage.getItem('customer');
      setUser(JSON.parse(user));
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  return (
    // <Card className="glass">
    <Layout style={{ height: "100%" }} className="transparent">
      {/* <Header> */}
      <CustomerPageHeading
        text={`Hi! ${user.name}`
          // isManager()
          //   ? "Manager Dashboard"
          //   : isEmployee()
          //   ? "Employee Dashboard"
          //   : null
        }
      />
      {/* </Header> */}
      <Divider />
      <Content className="transparent">
        <Row gutter={[16, 16]}>
          {/* First square */}
            <Col span={12}>
              {<Card title={"Accounts"} className="glass" hoverable bodyStyle={{width: '100%'}}>
                <AccountsList />
              </Card> }
            </Col>
          {/* Second square */}
              <Col span={12}>
              <Card title={"Recent transactions"} className="glass" hoverable bodyStyle={{width: '100%'}}>
              <TransactionsList />
              </Card>
            </Col>
            {/* Third square */}
            <Col span={12}>
              <Card title ={"Fixed Deposits"}   className="glass  " hoverable>
              <FixedDepositsList />
              </Card>
            </Col>
            {/* Fourth Square */}
            <Col span={12}>
              <Card className="glass center-content" hoverable>
              </Card>
            </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]} style={{ paddingTop: 0 }}>
          {cols}
        </Row>
      </Content>
    </Layout>
    // </Card>
  );
};

export default CustomerDashboard;
