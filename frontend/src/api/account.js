import axios from "axios";
import { BASE_URL } from "./config";

export function addAccount(data) {
  return axios
    .post(`${BASE_URL}/accounts`, {
      account_id: data.account_id,
      branch_id: data.branch_id,
      balance: data.balance,
      plan_id: data.plan_id,
      customer_id: data.customer_id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add account!"));
}

export const getAccounts = () => {
  return axios
    .get(`${BASE_URL}/accounts`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get accounts list!"));
};

export const getAccount = (id) => {
  return axios
    .get(`${BASE_URL}/accounts/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get accounts with id =" + id + "!"));
};

export const updateAccount = (data) => {
  console.log("update account", { data });
  return axios
    .put(`${BASE_URL}/accounts/${data.account_id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update account with id = " + data.account_id + "!")
    );
};

export const deleteAccount = (id) => {
  console.log("update account", { id });
  return axios
    .delete(`${BASE_URL}/accounts/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete account with id = " + id + "!")
    );
};
