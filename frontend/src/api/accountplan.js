import axios from "axios";
import { BASE_URL } from "./config";

export function addaccountplan(data) {
  return axios
    .post(`${BASE_URL}/accountplans`, {
      Plan_id: data.plan_id,
      Interest: data.interest,
      Type: data.Type,
      withdrawal_count : data.withdrawal_count,
      Min_amount: data.min_amount
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add accountplan!"));
}

export const getAccountPlans = () => {
  return axios
    .get(`${BASE_URL}/accountplans`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get accountplan list!"));
};

export const getAccountPlan = (id) => {
  return axios
    .get(`${BASE_URL}/accountplans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get accountplan with id =" + id + "!"));
};

export const updateAccountPlan = (data) => {
  console.log("update accountplan", { data });
  return axios
    .put(`${BASE_URL}/accountplans/${data.Plan_id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update accountplan with id = " + data.Plan_id + "!")
    );
};

export const deleteAccountPlan= (id) => {
  console.log("update accountplan", { id });
  return axios
    .delete(`${BASE_URL}/accountplans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete accountplan with id = " + id + "!")
    );
};
