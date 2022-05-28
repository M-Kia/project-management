import axios from "axios";
import { toast } from "react-toastify";
const objToFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

export async function formApiHandler(functionName, data) {
  let formData;
  if (data instanceof FormData) {
    formData = data;
  } else if (typeof data == "object") {
    formData = objToFormData(data);
  } else {
    formData = new FormData();
  }

  return axios.post(`http://localhost:3000/api/${functionName}`, formData);
}

export async function apiHandler(functionName, data) {
  return axios.post(`http://localhost:3000/api/${functionName}`, data);
}
