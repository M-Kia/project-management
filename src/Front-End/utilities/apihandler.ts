import axios from "axios";

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
  formData.append("files", data.files)
  return fetch(`/api/upload`, {
    method: "POST",
    body: formData,
  });
  // return axios.post(`http://localhost:3000/api/upload`, formData);
  // return axios.post(`http://localhost:3000/api/${functionName}`, formData);
}

export async function apiHandler(
  functionName: string,
  data,
  method: "post" | "get" | "put" | "delete" = "post"
  ) {
    // if (method.toLowerCase() === "get") {
    //   return axios.get(`/api/${functionName}`, {
    //     params: data,
    //   });
    // }
    return fetch(`/api/${functionName}`, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(res => res.json());
  // return axios[method](`/api/${functionName}`, data);
}
