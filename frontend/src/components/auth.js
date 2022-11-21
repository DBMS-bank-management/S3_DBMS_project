import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { isAuthenticated } from "../api";

import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

