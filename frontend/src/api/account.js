// import employeeAxios from "employeeAxios";
import { BASE_URL } from "./config";
import { employeeAxios, customerAxios } from "./authentication";

export function addAccount(data) {
  console.log("Account added ", { data });
  return employeeAxios
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
  return employeeAxios
    .get(`${BASE_URL}/accounts`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get accounts list!"));
};

export const getAccount = (id) => {
  return employeeAxios
    .get(`${BASE_URL}/accounts/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to get accounts with id =" + id + "!")
    );
};

export const updateAccount = (data) => {
  console.log("update account", { data });
  return employeeAxios
    .put(`${BASE_URL}/accounts/${data.account_id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to update account with id = " + data.account_id + "!"
      )
    );
};

export const deleteAccount = (id) => {
  console.log("update account", { id });
  return employeeAxios
    .delete(`${BASE_URL}/accounts/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete account with id = " + id + "!")
    );
};

export const getAccountsByID = () => {
  return customerAxios
    .get(`${BASE_URL}/accounts/byUser`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get customers accounts list!"));
};

export const getSavingsAccountsByCustomer = () => {
  return customerAxios
    .get(`${BASE_URL}/accounts/byUser/savings`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get customers accounts list!"));
};
