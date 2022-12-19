import { useState, useRef } from "react";
import { employeeLogin } from "../../api";
import { Button, Checkbox, Form, Input, Card } from "antd";
import logo from "../../logo.svg";
import { navigateToHome } from "../../utils/navigation";
import bgImage from "../../images/employeePortal/EmployeeLogin.jpg";

const clamp = (min, max, val) => Math.max(min, Math.min(val, max));

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [processing, setProcessing] = useState(false);
  const [password, setPassword] = useState("");
  function submitLogin() {
    employeeLogin({ username, password })
      .then((token) => (window.location = "/employee-portal"))
      .catch((err) => {
        setProcessing(false);
        alert(err);
      });
  }

  const onFinish = (values) => {
    submitLogin();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const inputRefs = useRef([]);

  const handleKeyPress = (index) => () => {
    const nextIndex = clamp(0, 2 - 1, index + 1);
    inputRefs.current[nextIndex].focus();
  };

  return (
    <div
      className="login"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#ececec",
        // background-color: #21D4FD;
        // backgroundImage: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
      }}
    >
      <Card className="glass padding rounded">
        {/* <div className="glass"> */}
          <img src={logo} className="App-logo" alt="logo" />
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Username is required!",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                onKeyPress={() => handleKeyPress(0)}
                inputRef={(ref) => (inputRefs.current[0] = ref)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
            >
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                inputRef={(ref) => (inputRefs.current[1] = ref)}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <div
              // wrapperCol={{
              //   offset: 8,
              //   span: 16,

              // }}
              style={{
                width: "100%",
                justifyContent: "space-around",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Button
                type="primary"
                // disabled={!username || !password}
                onClick={navigateToHome}
              >
                Cancel
              </Button>
              <Button
                type={"primary"}
                loading={processing}
                htmlType="submit"
                disabled={!username || !password}
                onClick={() => setProcessing(true)}
              >
                Login
              </Button>
            </div>
          </Form>
        {/* </div> */}
      </Card>
      {/* <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Log in </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={submitLogin}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-default">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EmployeeLogin;
