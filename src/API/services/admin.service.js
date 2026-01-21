import { data } from "react-router-dom";
import axios from "../axiosCustomize";

//User
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append(`email`, email);
  data.append(`password`, password);
  data.append(`username`, username);
  data.append(`role`, role);
  data.append(`userImage`, image);

  return axios.post(`/api/v1/participant`, data);
};

const getAllUser = () => {
  return axios.get(`/api/v1/participant/all`);
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();

  data.append(`id`, id);
  data.append(`username`, username);
  data.append(`role`, role);
  data.append(`userImage`, image);

  return axios.put(`/api/v1/participant`, data);
};

const deleteUser = (userId) => {
  return axios.delete(`/api/v1/participant`, { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`);
};

const putViewUser = (id, username, role, image) => {
  const data = new FormData();

  data.append(`id`, id);
  data.append(`username`, username);
  data.append(`role`, role);
  data.append(`userImage`, image);

  return axios.put(`/api/v1/participant`, data);
};

//Quiz
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();

  data.append(`description`, description);
  data.append(`name`, name);
  data.append(`difficulty`, difficulty);
  data.append(`quizImage`, quizImage);

  return axios.post(`/api/v1/quiz`, data);
};

const getAllQuiz = () => {
  return axios.get(`/api/v1/quiz/all`, data);
};

const putQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();

  data.append(`id`, id);
  data.append(`description`, description);
  data.append(`name`, name);
  data.append(`difficulty`, difficulty);
  data.append(`quizImage`, quizImage);

  return axios.put(`/api/v1/participant`, data);
};

export {
  postCreateNewUser,
  getAllUser,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  putViewUser,
  postCreateNewQuiz,
  getAllQuiz,
  putQuiz,
};
