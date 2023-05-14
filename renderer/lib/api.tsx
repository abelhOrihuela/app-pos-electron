/* eslint-disable func-names */
import axios from "axios";
import Router from "next/router";

const APIURL = "http://localhost:3000/api"; //process.env.API_URL;

const second = 1000;
const minute = 60 * second;

const instance = axios.create({
  baseURL: APIURL,
  timeout: minute * 20,
  headers: {
    "Content-Type": "application/json",
  },
  // validateStatus(status) {
  //     if (status === 401) {
  //         Router.replace('/login', { shallow: true })
  //     }
  // },
});

function logout() {
  // if (window.localStorage.getItem('user')) {
  window.localStorage.clear();
  window.location.href = "/";
  // }
}

function getToken() {
  return window.localStorage.getItem("access_token");
}

instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.status === 401) {
      logout();
    }

    try {
      return Promise.reject(error.response.data);
    } catch (error) {
      return Promise.reject("An error ocurred");
    }
  }
);

function post(url, params) {
  const token = getToken();

  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return instance.post(url, params);
}

function update(url, params) {
  const token = getToken();

  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return instance.put(url, params);
}

function del(url, params) {
  const token = getToken();

  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return instance.delete(url, {
    data: params,
  });
}

function get(url, params) {
  const token = getToken();

  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return instance.get(url);
}

export default {
  post,
  get,
  instance,
  logout,
  del,
  update,
};
