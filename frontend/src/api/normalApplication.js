// import axios from "axios";
import { employeeAxios as axios } from './authentication';
import { BASE_URL } from "./config";

export function addNormalApplication(data) {
  return axios
    .post(`${BASE_URL}/normalApplications`, {
      branch_ID: data.branch_ID,
      acc_ID: data.acc_ID,
      amount: data.amount,
      is_approved: data.is_approved,
      app_date: data.app_date,
      loan_ID: data.loan_ID,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add normal application!"));
}

export const getNormalApplications = () => {
  return axios
    .get(`${BASE_URL}/normalApplications`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get normal applications list!"));
};

export const getNormalApplication = (id) => {
  return axios
    .get(`${BASE_URL}/normalApplications/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get normal application with id =" + id + "!"));
};

export const updateNormalApplication = (data) => {
  console.log("update normal application", { data });
  return axios
    .put(`${BASE_URL}/normalApplications/${data.app_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update normal application with id = " + data.app_ID + "!")
    );
  console.log({ data });
};

export const deleteNormalApplication = (id) => {
  console.log("update normal application", { id });
  return axios
    .delete(`${BASE_URL}/normalApplications/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete normal application with id = " + id + "!")
    );
};
