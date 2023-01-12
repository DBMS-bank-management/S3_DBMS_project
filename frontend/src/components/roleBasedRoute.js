import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function OnlyManager({ children }) {
  let location = useLocation();

  if (localStorage.getItem("employee-role") != "manager") {
    return <Navigate to="/employee-portal/" state={{ from: location }} />;
  }

  return children;
}
