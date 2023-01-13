import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, message, Switch, Select } from "antd";
import { addEmployee } from "../../../api/employee";
import { EmployeePageHeading } from "../../../components/layout/employeePageHeading";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    emp_name: "",
    branch_ID: "",
    Is_Manager: "",
    auth_ID: "",
  });

  useEffect(() => {
    loadUserDetails();
  }, []);

  const [user, setUser] = useState();
  function submitData(values) {
    addEmployee(values)
      .then((token) => (window.location = "/employee-portal/employees"))
      .catch((err) => message.error(err));
  }

  const onFinish = (values) => {
    submitData(values);
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const loadUserDetails = async () => {
    try {
      const user = await localStorage.getItem("employee");
      setUser(JSON.parse(user));
    } catch (err) {
      message.error("Error loading user branch");
    }
  };

  const getCurrentEmployeeBranch = () => {
    return user?.branch_ID;
  };

  const branch = getCurrentEmployeeBranch();

  return (
    <div className="transparent">
      <EmployeePageHeading text={"Add Employee"} />
      <Card>
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
            label="Employee username"
            name="emp_ID"
            rules={[
              {
                required: true,
                message: "Employee username is required!",
              },
            ]}
          >
            <Input
            // value={formData.emp_name}
            // onChange={(e) => {
            //   setFormData({ ...formData, emp_name: e.target.value });
            // }}
            />
          </Form.Item>
          <Form.Item
            label="Employee Name"
            name="emp_name"
            rules={[
              {
                required: true,
                message: "Employee name is required!",
              },
            ]}
          >
            <Input
            // value={formData.emp_name}
            // onChange={(e) => {
            //   setFormData({ ...formData, emp_name: e.target.value });
            // }}
            />
          </Form.Item>

          <Form.Item
            label="Branch"
            name="branch_ID"
            initialValue={branch}
            rules={[
              {
                required: true,
                message: "Branch ID is required!",
              },
            ]}
          >
            <Select
              // value={branch}
              options={[{ label: branch, value: branch }]}
            />
          </Form.Item>

          <Form.Item
            label="Is Manager"
            name="Is_Manager"
            rules={[
              {
                required: true,
                message: "Is Manager is required!",
              },
            ]}
          >
            <Switch />
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
              // value={formData.auth_ID}
              // onChange={(e) => {
              //   setFormData({ ...formData, auth_ID: e.target.value });
              // }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              Add Employee
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddEmployee;
