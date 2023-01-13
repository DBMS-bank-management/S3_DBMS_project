// import employeeAxios from "employeeAxios";
import { BASE_URL } from "./config";
import { employeeAxios, customerAxios } from "./authentication";

export const getTotalTransactionReport = () => {
  return employeeAxios
    .get(`${BASE_URL}/reports/totalTransactionReport`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => Promise.reject("Failed to get totalTransactionReport list!"));
};

export const getLateInstallmentsReport = () => {
    return employeeAxios
      .get(`${BASE_URL}/reports/lateInstallmentsReport`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed to get lateInstallmentsReport list!"));
  };
  
