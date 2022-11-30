import axios from "axios";
import { BASE_URL } from "./config";

export function addBranch(data) {
  return axios
    .post(`${BASE_URL}/branches`, {
      branch_id: data.branch_id,
      br_name: data.br_name,
      location: data.location,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to add branch!"));
}

export const getBranches = () => {
  return axios
    .get(`${BASE_URL}/branches`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get branches list!"));
};

export const getBranch = (id) => {
  return axios
    .get(`${BASE_URL}/branches/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get branches with id =" + id + "!"));
};

export const updateBranch = (data) => {
  console.log("update branch", { data });
  return axios
    .put(`${BASE_URL}/branches/${data.branch_id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to update branch with id = " + data.branch_id + "!")
    );
  console.log({ data });
};

export const deleteBranch = (id) => {
  console.log("update branch", { id });
  return axios
    .delete(`${BASE_URL}/branches/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) =>
      Promise.reject("Failed to delete branch with id = " + id + "!")
    );
};
