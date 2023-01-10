// import axios from "axios";
import { customerAxios, employeeAxios as axios, employeeAxios } from "./authentication";
import { BASE_URL } from "./config";

export function addNormalApplication(data) {
  return axios
    .post(`${BASE_URL}/normalApplications`, {
      acc_ID: data.acc_ID,
      amount: data.amount,
      plan_ID: data.plan_ID,
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
    .catch((err) =>
      Promise.reject("Failed to get normal application with id =" + id + "!")
    );
};

export const updateNormalApplication = (data) => {
  console.log("update normal application", { data });
  return axios
    .put(`${BASE_URL}/normalApplications/${data.app_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to update normal application with id = " + data.app_ID + "!"
      )
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
      Promise.reject(
        "Failed to delete normal application with id = " + id + "!"
      )
    );
};

export const declineNormalApplication = (id) => {
  console.log("decline normal application", id);
  return employeeAxios
    .post(`${BASE_URL}/normalApplications/decline/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to declined normal application with id = " + id + "!"
      )
    );
};

export const approveNormalApplication = (id) => {
  console.log("approve normal application", id);
  return employeeAxios
    .post(`${BASE_URL}/normalApplications/approve/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to approve normal application with id = " + id + "!"
      )
    );
};

export const getPendingLoanApplicationsByID = () => {
  return customerAxios
    .get(`${BASE_URL}/normalApplications/pending/byUser`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get pending loans list!"));
};