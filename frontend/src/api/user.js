import axios from "axios";
import { BASE_URL } from "./config";

export function addUser(data) {
  return axios
    .post(`${BASE_URL}/users`, {
      password: data.password,
      role: "employee",
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add user!"));
}

export const getUsers = () => {
  return axios
    .get(`${BASE_URL}/users`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get users list!"));
};
