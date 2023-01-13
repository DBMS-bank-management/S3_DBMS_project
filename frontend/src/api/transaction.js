import axios from "axios";
import { customerAxios, employeeAxios } from "./authentication";
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
    .catch((err) =>
      Promise.reject("Failed to get transactions with id =" + id + "!")
    );
};

export const updateTransaction = (data) => {
  console.log("update transaction", { data });
  return axios
    .put(`${BASE_URL}/transactions/${data.trans_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to update installment with id = " + data.trans_ID + "!"
      )
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

export const getTransactionsByID = (id) => {
  return customerAxios
    .get(`${BASE_URL}/transactions/byCustomer`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get transactions ID list!"));
};

export const addTransfer = (data) => {
  console.log("add transfer", { data });
  return employeeAxios
    .post(`${BASE_URL}/transactions/transfer/add`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add transfer"));
};

export const addTransferByCustomer = (data) => {
  console.log("add transfer", { data });
  return customerAxios
    .post(`${BASE_URL}/transactions/transfer/add`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add transfer"));
};

export const addWithdraw = (data) => {
  console.log("add withdrawal", { data });
  return axios
    .put(`${BASE_URL}/transactions/withdrawal/addWithdrawal`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add withdrawal"));
};

export const getWithdrawalsCount = (account) => {
  return employeeAxios
    .post(`${BASE_URL}/transactions/withdrawals/count`, account)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get withdrawalcount"));
};
