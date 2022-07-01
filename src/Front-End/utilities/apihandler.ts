import Cookies from "js-cookie";
import axios, { AxiosRequestHeaders } from "axios";

const objToFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

export async function imageUploader(data: object) {
  let formData = new FormData();
  formData.append("files", data.files);

  let headers: AxiosRequestHeaders = {};
  let token = Cookies.get("token");
  if (typeof token !== "undefined") {
    headers = { Authorization: `hkn ${token}` };
  }

  return axios.post(`/api/upload`, formData, {
    headers,
  });
}

export async function apiHandler(
  functionName: string,
  data,
  method: "post" | "get" | "patch" | "delete" = "post"
) {
  let headers: AxiosRequestHeaders = {};
  let token = Cookies.get("token");
  if (typeof token !== "undefined") {
    headers = { Authorization: `hkn ${token}` };
  }

  if (method.toLowerCase() === "get") {
    return axios.get(`/api/${functionName}`, {
      params: data,
      headers,
    });
  }
  if (method.toLowerCase() === "delete") {
    return axios.delete(`/api/${functionName}`, {
      headers,
      data,
    });
  }
  return axios[method](`/api/${functionName}`, data, {
    headers,
  });
}
