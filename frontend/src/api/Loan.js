import axios from "axios";
import { customerAxios, employeeAxios } from "./authentication";
import { BASE_URL } from "./config";

export function addLoan(data) {
  return axios
    .post(`${BASE_URL}/loans`, {
        loan_ID: data.loan_ID,
        acc_ID: data.acc_ID,
        amount: data.amount,
      plan_id: data.plan_id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add loan!"));
}

export const getLoans = () => {
  return employeeAxios
    .get(`${BASE_URL}/loans`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get accounts list!"));
};

export const getLoan = (id) => {
  return axios
    .get(`${BASE_URL}/loans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get loans with id =" + id + "!"));
};

export const updateLoan = (data) => {
  console.log("update loan", { data });
  return axios
    .put(`${BASE_URL}/loans/${data.loan_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update loan with id = " + data.loan_ID + "!")
    );
};

export const deleteLoan = (id) => {
  console.log("update loan", { id });
  return axios
    .delete(`${BASE_URL}/loans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete loan with id = " + id + "!")
    );
};

export const getLoansByID = (id) => {
  return customerAxios
    .get(`${BASE_URL}/loans/byUser`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get customers Loans list!"));
};