import axios from "axios";
import { employeeAxios } from "./authentication";
import { BASE_URL } from "./config";

export function addEmployee(data) {
  return employeeAxios
    .post(`${BASE_URL}/employees`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add user!"));
}

export const getEmployees = () => {
  return employeeAxios
    .get(`${BASE_URL}/employees`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get employees list!"));
};

export const getEmployee = (id) => {
  return axios
    .get(`${BASE_URL}/employees/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to get employee with id =" + id + "!")
    );
};

export const updateEmployee = (data) => {
  console.log("update employee", { data });
  return axios
    .put(`${BASE_URL}/employees/${data.auth_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to update employee with id = " + data.auth_ID + "!"
      )
    );
  console.log({ data });
};

export const deleteEmployee = (id) => {
  console.log("update employee", { id });
  return axios
    .delete(`${BASE_URL}/employees/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete employee with id = " + id + "!")
    );
};
