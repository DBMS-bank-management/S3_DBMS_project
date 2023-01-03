// import axios from "axios";
import { employeeAxios as axios } from './authentication';
import { BASE_URL } from "./config";

export function addOnlineApplication(data) {
  return axios
    .post(`${BASE_URL}/onlineApplications`, {
      fd_ID: data.fd_ID,
      acc_ID: data.acc_ID,
      amount: data.amount,
      app_date: data.app_date,
      loan_ID: data.loan_ID,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add online application!"));
}

export const getOnlineApplications = () => {
  return axios
    .get(`${BASE_URL}/onlineApplications`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get online applications list!"));
};

export const getOnlineApplication = (id) => {
  return axios
    .get(`${BASE_URL}/onlineApplications/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get online application with id =" + id + "!"));
};

export const updateOnlineApplication = (data) => {
  console.log("update online application", { data });
  return axios
    .put(`${BASE_URL}/onlineApplications/${data.app_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update online application with id = " + data.app_ID + "!")
    );
  console.log({ data });
};

export const deleteOnlineApplication = (id) => {
  console.log("update online application", { id });
  return axios
    .delete(`${BASE_URL}/onlineApplications/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete online application with id = " + id + "!")
    );
};
