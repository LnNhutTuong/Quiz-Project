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

const deleteQuiz = (quizId) => {
  return axios.delete(`/api/v1/quiz/${quizId}`, {
    data: { id: quizId },
  });
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();

  data.append(`id`, id);
  data.append(`description`, description);
  data.append(`name`, name);
  data.append(`difficulty`, difficulty);
  data.append(`quizImage`, quizImage);

  return axios.put(`/api/v1/quiz`, data);
};

const postNewQuestion = (quiz_id, description, questionImage) => {
  const data = new FormData();

  data.append(`quiz_id`, quiz_id);
  data.append(`description`, description);
  data.append(`questionImage`, questionImage);

  return axios.post(`/api/v1/question`, data);
};

const postNewAnswer = (description, correct_answer, question_id) => {
  const data = new FormData();

  data.append(`description`, description);
  data.append(`correct_answer`, correct_answer);
  data.append(`question_id`, question_id);

  return axios.post(`/api/v1/answer`, data);
};

const getQuestionById = (quiz_id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${quiz_id}`, {
    data: { id: quiz_id },
  });
};

const putAnswer = (description, correct_answer, question_id, answer_id) => {
  const data = new FormData();

  data.append(`description`, description);
  data.append(`correct_answer`, correct_answer);
  data.append(`question_id`, question_id);
  data.append(`answer_id`, answer_id);

  return axios.put("/api/v1/answer", data);
};

const postAssignUser = (quizId, userId) => {
  return axios.post("/api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
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
  deleteQuiz,
  putUpdateQuiz,
  postNewQuestion,
  postNewAnswer,
  getQuestionById,
  putAnswer,
  postAssignUser,
};
