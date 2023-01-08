import React, { useEffect, useState } from "react";
import { Avatar, Descriptions, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { dashSeperatedToHumanReadble } from "../utils/string";

export const Profile = ({ type, LogoutButton }) => {
  const [user, setUser] = useState({});
  const { err, setErr } = useState();

  const loadUserDetails = async () => {
    try {
      const user = await localStorage.getItem(type);
      setUser(JSON.parse(user));
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  if (err) {
    return <LogoutButton />;
  }

  return (
    <Popover
      className="glass"
      placement="bottomRight"
      title={"Profile"}
      arrowPointAtCenter
      content={
        <>
          {user && (
            <Descriptions
              title="User Details"
              bordered
              style={{ paddingBottom: 10 }}
            >
              {Object.keys(user).map((key) => (
                <Descriptions.Item
                  key={key}
                  label={dashSeperatedToHumanReadble(key)}
                  span={4}
                >
                  {user[key]}
                </Descriptions.Item>
              ))}
            </Descriptions>
          )}
          {LogoutButton}
        </>
      }
      trigger="hover"
    >
      <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
    </Popover>
  );
};
