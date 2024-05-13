import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 15000,
  responseType: "json",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json; charset=UTF-8",
  },
});

const request = (method: string, url: string, data: any) => {
  if (method === "GET") {
    return axiosInstance.request({
      url,
      method,
      params: data,
    });
  } else {
    return axiosInstance.request({
      url,
      method,
      data,
    });
  }
};

const requests = {
  get: (url: string, data?: any) => {
    return request("GET", url, data);
  },
  post: (url: string, data: any) => {
    return request("POST", url, data);
  },
  put: (url: string, data: any) => {
    return request("PUT", url, data);
  },
  delete: (url: string, data?: any) => {
    return request("DELETE", url, data);
  },
};

export default requests;
