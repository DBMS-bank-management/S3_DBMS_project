import React from "react";
import { Typography, Layout, Card, Col, Row, Statistic, Divider } from "antd";
import { isEmployee, isManager } from "../../api";
import { CustomerPageHeading } from "../../components/layout/CustomerPageHeading";
import AccountsList from "./Accounts/dashboardAccountList";
const { Header, Footer, Sider, Content } = Layout;

export const CustomerDashboard = () => {

  const cols = [];
  const colCount = 2;
  let colCode = "";  
  return (
    // <Card className="glass">
    <Layout style={{ height: "100%" }} className="transparent">
      {/* <Header> */}
      <CustomerPageHeading
        text={"HI!"
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
              {<Card className="glass center-content" hoverable bodyStyle={{width: '100%'}}>
                <AccountsList />
              </Card> }
            </Col>
          {/* Second square */}
              <Col span={12}>
              <Card className="glass center-content" hoverable>
              </Card>
            </Col>
            {/* Third square */}
            <Col span={12}>
              <Card className="glass center-content" hoverable>
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
