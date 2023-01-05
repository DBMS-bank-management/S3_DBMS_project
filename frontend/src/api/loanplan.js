import axios from "axios";
import { BASE_URL } from "./config";

export function addloanplan(data) {
  return axios
    .post(`${BASE_URL}/loanplans`, {
      Plan_id: data.plan_id,
      Interest: data.interest,
      Type: data.Type,
      withdrawal_count : data.withdrawal_count,
      Min_amount: data.min_amount
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add loanplan!"));
}

export const getLoanPlans = () => {
  return axios
    .get(`${BASE_URL}/loanplans`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get loanplan list!"));
};

export const getLoanPlan = (id) => {
  return axios
    .get(`${BASE_URL}/loanplans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get loanplan with id =" + id + "!"));
};

export const updateLoanPlan = (data) => {
  console.log("update loanplan", { data });
  return axios
    .put(`${BASE_URL}/loanplans/${data.Plan_id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update loanplan with id = " + data.Plan_id + "!")
    );
};

export const deleteLoanPlan= (id) => {
  console.log("update loanplan", { id });
  return axios
    .delete(`${BASE_URL}/loanplans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete loanplan with id = " + id + "!")
    );
};
