import axios from "axios";
import { BASE_URL } from "./config";

export function addTransaction(data) {
  return axios
    .post(`${BASE_URL}/transactions`, {
        trans_ID: data.trans_ID,
        mode_ID: data.mode_ID,
        amount: data.amount,
        description: data.description,
        acc_ID: data.acc_ID,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add transaction!"));
}

export const getTransactions = () => {
  return axios
    .get(`${BASE_URL}/transactions`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get transactions list!"));
};

export const getTransaction = (id) => {
  return axios
    .get(`${BASE_URL}/transactions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get transactions with id =" + id + "!"));
};

export const updateTransaction = (data) => {
  console.log("update transaction", { data });
  return axios
    .put(`${BASE_URL}/transactions/${data.trans_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update intallment with id = " + data.trans_ID + "!")
    );
};

export const deleteTransaction = (id) => {
  console.log("update transaction", { id });
  return axios
    .delete(`${BASE_URL}/transactions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete transaction with id = " + id + "!")
    );
};
