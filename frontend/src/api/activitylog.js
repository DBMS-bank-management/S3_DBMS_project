import axios from "axios";
import { BASE_URL } from "./config";

export function addLog(data) {
    return axios
      .post(`${BASE_URL}/activitylogs`, {
        log_id: data.log_id,
        auth_id: data.auth_name,
        timestamp: data.timestamp,
        action: data.action
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed to add log!"));
  }
  export const getLogs = () => {
    return axios
      .get(`${BASE_URL}/activitylogs`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed to get log list!"));
  };