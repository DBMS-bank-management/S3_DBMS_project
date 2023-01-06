// import employeeAxios from "employeeAxios";
import { employeeAxios as employeeAxios } from './authentication';
import { BASE_URL } from "./config";

export function addUser(data) {
  return employeeAxios
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
  return employeeAxios
    .get(`${BASE_URL}/users`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get users list!"));
};

export const getUser = (id) => {
  return employeeAxios
    .get(`${BASE_URL}/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get user with id =" + id + "!"));
};

export const updateUser = (data) => {
  console.log("update user", { data });
  return employeeAxios
    .put(`${BASE_URL}/users/${data.auth_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update user with id = " + data.auth_ID + "!")
    );
  console.log({ data });
};

export const deleteUser = (id) => {
  console.log("update user", { id });
  return employeeAxios
    .delete(`${BASE_URL}/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete user with id = " + id + "!")
    );
};
