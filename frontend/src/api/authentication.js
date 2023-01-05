import axios from "axios";
import { navigateToCustomerLogin, navigateToEmployeeLogin } from "../utils/navigation";
import { BASE_URL } from "./config";

const employeeAxiosInstance = axios.create({ baseURL: BASE_URL });
employeeAxiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("employee-access-token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const employeeAxios = employeeAxiosInstance;

export async function employeeLogin(data) {
  return axios
    .post(`${BASE_URL}/auth/employee-login`, {
      username: data.username,
      password: data.password,
    })
    .then((response) => {
      console.log({ data: response.data });
      localStorage.setItem("role", response.data.auth.role);
      localStorage.setItem("employee-access-token", response.data.token);
      localStorage.setItem(
        "employee-access-token-expiration",
        Date.now() + 2 * 60 * 60 * 1000
      );
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      return response.data;
    })
    .catch((err) => Promise.reject("Authentication Failed!"));
}

export function employeeLogout() {
  localStorage.removeItem("role");
  localStorage.removeItem("employee-access-token");
  localStorage.removeItem("employee-access-token-expiration");
  navigateToEmployeeLogin();
}

export function isManager() {
  return localStorage.getItem("role") === "manager";
}

export function isEmployee() {
  return localStorage.getItem("role") === "employee";
}

export function isCustomer() {
  return localStorage.getItem("role") === "customer";
}

export function isAuthenticatedEmployee() {
  return (
    localStorage.getItem("employee-access-token") &&
    localStorage.getItem("employee-access-token-expiration") > Date.now()
  );
}

const customerAxiosInstance = axios.create({ baseURL: BASE_URL });
customerAxiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("customer-access-token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const customerAxios = customerAxiosInstance;

export async function customerLogin(data) {
  return axios
    .post(`${BASE_URL}/auth/customer-login`, {
      username: data.username,
      password: data.password,
    })
    .then((response) => {
      console.log({ data: response.data });
      localStorage.setItem("role", response.data.auth.role);
      localStorage.setItem("customer-access-token", response.data.token);
      localStorage.setItem(
        "customer-access-token-expiration",
        Date.now() + 2 * 60 * 60 * 1000
      );
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      return response.data;
    })
    .catch((err) => Promise.reject("Authentication Failed!"));
}

export function customerLogout() {
  localStorage.removeItem("role");
  localStorage.removeItem("customer-access-token");
  localStorage.removeItem("customer-access-token-expiration");
  navigateToCustomerLogin();
}

export function isAuthenticatedCustomer() {
  return (
    localStorage.getItem("customer-access-token") &&
    localStorage.getItem("customer-access-token-expiration") > Date.now()
  );
}
