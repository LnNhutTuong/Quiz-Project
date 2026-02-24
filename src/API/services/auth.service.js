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

const postChangePassword = (current_password, new_password) => {
  return axios.post(`/api/v1/change-password`, {
    current_password,
    new_password,
  });
};

export { postLogin, postSignUp, postLogOut, postChangePassword };
