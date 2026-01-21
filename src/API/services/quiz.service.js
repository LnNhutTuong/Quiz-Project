import axios from "../axiosCustomize";

//Quiz by user
const getQuizByUsers = () => {
  return axios.get(`/api/v1/quiz-by-participant`);
};

const getDataQuiz = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, { ...data });
};

export { getQuizByUsers, getDataQuiz, postSubmitQuiz };
