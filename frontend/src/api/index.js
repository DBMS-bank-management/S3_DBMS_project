import axios from "axios";
import { BASE_URL } from "./config";

export function getRegularTips() {
  return axios
    .get(`${BASE_URL}/api/tips/regular`)
    .then((response) => response.data);
}

export function getSpecialTips() {
  return axios
    .get(`${BASE_URL}/api/tips/special`, {
      params: { "x-access-token": localStorage.getItem("x-access-token") },
    })
    .then((response) => response.data)
    .catch((err) => Promise.reject("Request Not Authenticated!"));
}

export function login(data) {
  return axios
    .post(`${BASE_URL}/auth/login`, {
      username: data.username,
      password: data.password,
    })
    .then((response) => {
      console.log({ data: response.data });
      localStorage.setItem("x-access-token", response.data.token);
      localStorage.setItem(
        "x-access-token-expiration",
        Date.now() + 2 * 60 * 60 * 1000
      );
      return response.data;
    })
    .catch((err) => Promise.reject("Authentication Failed!"));
}

export function logout() {
  localStorage.removeItem("x-access-token");
  localStorage.removeItem("x-access-token-expiration");
  window.location = "/login";
}

export function isAuthenticated() {
  return (
    localStorage.getItem("x-access-token") &&
    localStorage.getItem("x-access-token-expiration") > Date.now()
  );
}

export function isEmployee() {}
