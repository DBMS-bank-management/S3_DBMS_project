import axios from "axios";
import { BASE_URL } from "./config";

export function addFdplans(data) {
  return axios
    .post(`${BASE_URL}/Fdplans`, {
      Plan_id: data.plan_id,
      Interest: data.interest,
      Type: data.Type,
      withdrawal_count : data.withdrawal_count,
      Min_amount: data.min_amount
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add Fdplan!"));
}

export const getFdPlans = () => {
  return axios
    .get(`${BASE_URL}/fixeddepositplans`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get Fdplans list!"));
};

export const getFdPlan = (id) => {
  return axios
    .get(`${BASE_URL}/fixeddepositplans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get Fdplan with id =" + id + "!"));
};

export const updateFdPlan = (data) => {
  console.log("update Fdplan", { data });
  return axios
    .put(`${BASE_URL}/fixeddepositplans/${data.Plan_id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update Fdplan with id = " + data.Plan_id + "!")
    );
};

export const deleteFdPlan = (id) => {
  console.log("update Fdplan", { id });
  return axios
    .delete(`${BASE_URL}/fixeddepositplans/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete Fdplan with id = " + id + "!")
    );
};
