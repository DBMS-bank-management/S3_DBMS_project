import axios from "axios";
import { customerAxios, employeeAxios } from "./authentication";
import { BASE_URL } from "./config";

export function addFD(data) {
  return axios
    .post(`${BASE_URL}/fd`, {
      fd_ID: data.fd_ID,
      acc_ID: data.acc_ID,
      start_date: data.start_date,
      amount: data.amount,
      plan_ID: data.plan_ID,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add fd!"));
}

export const getFDs = () => {
  return employeeAxios
    .get(`${BASE_URL}/fd`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get fd list!"));
};

export const getFD = (id) => {
  return axios
    .get(`${BASE_URL}/fd/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get fd with id =" + id + "!"));
};

export const updateFD = (data) => {
  console.log("update fd", { data });
  return axios
    .put(`${BASE_URL}/fd/${data.inst_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to update intallment with id = " + data.inst_ID + "!"
      )
    );
};

export const deleteFD = (id) => {
  console.log("update fd", { id });
  return axios
    .delete(`${BASE_URL}/fd/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete fd with id = " + id + "!")
    );
};

export const getFixedDepositsByID = (id) => {
  return customerAxios
    .get(`${BASE_URL}/fd/byCustomer`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get customers Fixed Deposits list!"));
};
