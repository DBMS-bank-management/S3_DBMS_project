import axios from "axios";
import { BASE_URL } from "./config";

export function addCustomer(data) {
  return axios
    .post(`${BASE_URL}/customers`, {
      ID: data.ID,
      name: data.name,
      type: data.type,
      auth_ID: data.auth_ID,
      contact_no: data.contact_no,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add customer!"));
}

export const getCustomers = () => {
  return axios
    .get(`${BASE_URL}/customers`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get customers list!"));
};

export const getCustomer = (id) => {
  return axios
    .get(`${BASE_URL}/customers/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to get customer with id =" + id + "!")
    );
};

export const updateCustomer = (data) => {
  console.log("update customer", { data });
  return axios
    .put(`${BASE_URL}/customers/${data.auth_ID}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject(
        "Failed to update customer with id = " + data.auth_ID + "!"
      )
    );
  console.log({ data });
};

export const deleteCustomer = (id) => {
  console.log("update customer", { id });
  return axios
    .delete(`${BASE_URL}/customers/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete customer with id = " + id + "!")
    );
};
