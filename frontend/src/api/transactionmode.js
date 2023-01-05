import axios from "axios";
import { BASE_URL } from "./config";

export function addtransMode(data) {
  return axios
    .post(`${BASE_URL}/transactionmodes`, {
      Mode_id: data.Mode_ID,
      fee: data.fee,

    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add transactionmode!"));
}

export const getTransModes = () => {
  return axios
    .get(`${BASE_URL}/transactionmodes`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get transactionmodes list!"));
};

export const getTransMode = (id) => {
  return axios
    .get(`${BASE_URL}/transactionmodes/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get transactionmodes with id =" + id + "!"));
};

export const updateTransMode = (data) => {
  console.log("update transactionmode", { data });
  return axios
    .put(`${BASE_URL}/transactionmodes/${data.Mode_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update transactionmode with id = " + data.Mode_ID + "!")
    );
};

export const deleteTransmode = (id) => {
  console.log("update transactionmodes", { id });
  return axios
    .delete(`${BASE_URL}/transactionmodes/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete transactionmode with id = " + id + "!")
    );
};