import { AuthHeader } from "./Auth";
import axios from 'axios';

let cancelToken;

let url;
switch (process.env.NODE_ENV) {
  case "development":
    url = "https://dummyjson.com";
    break;
  default:
    url = "https://dummyjson.com";
    break;
}

export const getRequest = async (endpoint, isCancel = false) => {
  return makeRequest(`${url}/${endpoint}`, "GET", isCancel);
};


export const putRequest = async (endpoint, body, isCancel = false) => {
  return makeRequest(`${url}/${endpoint}`, "PUT", body, isCancel);
};


export const postRequest = async (endpoint, body, isCancel = false) => {
  return makeRequest(`${url}/${endpoint}`, "POST", body, isCancel);
};

export const deleteRequest = async (endpoint, body, isCancel = false) => {
  return makeRequest(`${url}/${endpoint}`, "DELETE", body, isCancel);
};



const makeRequest = async (endpoint, responseType, data, isCancel = false) => {
  if (isCancel) {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }
    cancelToken = axios.CancelToken.source();
  }
  try {
    const resp = await axios({
      url: endpoint,
      method: responseType,
      // data: JSON.stringify(data),
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: AuthHeader().Authorization,
      },
      cancelToken: isCancel && cancelToken.token,
    });
    return await handleResponse(resp);
  } catch (e) {
    console.log(e)
  }
};



const handleResponse = (response) => {
  console.log(response, 'res');
  if (response.status === 200 || response.status === 201) {
    return response;
  } else if (response.status === 401) {
    throw new Error("UnAuthorised");
  } else if (response.status === 500) {
    // console.log("Session Time Out!");

    if (
      response.message === "Please authenticate"
    ) {
      window.location.href = "/";
      //   toast.error("Session Time Out!");
    } else {
      //   toast.error("Internal server error");
    }
  } else {
    // toast.error("Network Error");
  }
};

