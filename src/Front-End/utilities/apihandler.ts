import Cookies from "js-cookie";
import axios, { AxiosRequestHeaders } from "axios";

const objToFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

export async function imageUploader(
  // functionName: string,
  // data: FormData | object | undefined
  data: object
) {
  // let formData;
  // if (data instanceof FormData) {
  //   formData = data;
  // } else if (typeof data == "object") {
  //   formData = objToFormData(data);
  // } else {
  //   formData = new FormData();
  // }
  let formData = new FormData();
  formData.append("files", data.files);
  // return fetch(`/api/upload`, {
  //   method: "POST",
  //   body: formData,
  // });

  let headers: AxiosRequestHeaders = {};
  let token = Cookies.get("token");
  if (typeof token !== "undefined") {
    headers = { Authorization: `hkn ${token}` };
  }

  return axios.post(`/api/upload`, formData, {
    headers,
  });
  // return axios.post(`/api/${functionName}`, formData);
}

export async function apiHandler(
  functionName: string,
  data,
  method: "post" | "get" | "put" | "delete" = "post"
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
    // let param = Object.keys(data).map(val => `${val}=${data[val]}`)
    // return fetch(`/api/${functionName}?${param}`, {
    //   method: "GET"
    // });
  }
  // return fetch(`/api/${functionName}`, {
  //   method: method.toUpperCase(),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data),
  // }).then(res => res.json());

  return axios[method](`/api/${functionName}`, data, {
    headers,
  });
}
