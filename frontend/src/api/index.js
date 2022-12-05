import axios from "axios";
import { navigateToEmployeeLogin } from "../utils/navigation";
import { BASE_URL } from "./config";

const instance = axios.create({baseURL: BASE_URL})
instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("employee-access-token"); 
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const employeeAxios = instance;

export function employeeLogin(data) {
  return axios
    .post(`${BASE_URL}/auth/login`, {
      username: data.username,
      password: data.password,
    })
    .then((response) => {
      console.log({ data: response.data });
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

export function logout() {
  localStorage.removeItem("employee-access-token");
  localStorage.removeItem("employee-access-token-expiration");
  navigateToEmployeeLogin();
}

export function isAuthenticated() {
  return (
    localStorage.getItem("employee-access-token") &&
    localStorage.getItem("employee-access-token-expiration") > Date.now()
  );
}

export function isEmployee() {}
