import { data } from "react-router-dom";
import axios from "../axiosCustomize";

const postLogin = (email, password, delay) => {
  return axios.post(`/api/v1/login`, {
    email,
    password,
    delay: 3000,
  });
};

const postSignUp = (email, username, password) => {
  return axios.post(`/api/v1/register`, {
    email,
    username,
    password,
  });
};

const postLogOut = (email, refresh_token) => {
  return axios.post(`/api/v1/logout`, {
    email,
    refresh_token,
  });
};

export { postLogin, postSignUp, postLogOut };
