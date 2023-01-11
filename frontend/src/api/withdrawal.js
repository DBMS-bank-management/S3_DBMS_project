import axios from "axios";
import { customerAxios } from "./authentication";
import { BASE_URL } from "./config";

export function addWithdrawal(data) {
  return axios
    .post(`${BASE_URL}/transactions/withdrawal`, {
      trans_ID: data.trans_ID,
      mode_ID: data.mode_ID,
      amount: data.amount,
      description: data.description,
      acc_ID: data.acc_ID,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add withdrawal!"));
}

export const getWithdrawals = () => {
  return axios
    .get(`${BASE_URL}/transactions/withdrawal`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get withdrawals list!"));
};

export const getWithdrawal = (id) => {
  return axios
    .get(`${BASE_URL}/transactions/withdrawal/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to get withdrawal with id =" + id + "!")
    );
};

export const updateWithdrawal = (data) => {
  console.log("update withdrawal", { data });
  return axios
    .put(`${BASE_URL}/transactions/withdrawal/${data.trans_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to update withdrawal with id = " + data.trans_ID + "!"
      )
    );
};

export const deleteWithdrawal = (id) => {
  console.log("update withdrawal", { id });
  return axios
    .delete(`${BASE_URL}/transactions/withdrawal/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete withdrawal with id = " + id + "!")
    );
};

export const getWithdrawalsByID = (id) => {
  return customerAxios
    .get(`${BASE_URL}/transactions/withdrawal/byCustomer`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get withdrawals ID list!"));
};

export const addWithdraw = (data) => {
  console.log("add withdrawal", { data });
  return axios
    .post(`${BASE_URL}/transactions/withdrawal/addWithdrawal`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add withdrawal"));
};
