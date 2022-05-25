import axios from "axios";

const objToFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};
export async function apihandler(functionName, data) {
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
