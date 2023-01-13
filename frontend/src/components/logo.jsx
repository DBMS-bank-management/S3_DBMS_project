import React from "react";
import { useNavigate } from "react-router-dom";
import BankLogo from "../images/banklogo.png";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="logoH typing"
      style={{ display: "flex", flexDirection: "row" }}
      onClick={() => navigate("/")}
    >
      {/* <img src={BankLogo} style={{ width: 50, height: "100%", padding: 10 }} /> */}
      <div style={{ color: "white", paddingRight: 10, paddingLeft: 10 }}>
        S E N A C{" "}
      </div>
      <div style={{ color: "red" }}>B A N K</div>
    </div>
  );
};
