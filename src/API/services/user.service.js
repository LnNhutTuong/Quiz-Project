import axios from "../axiosCustomize";

const postUpdateProfile = (username, userImage) => {
  const data = new FormData();

  if (username) {
    data.append(`username`, username);
  }
  if (userImage) {
    data.append(`userImage`, userImage);
  }

  return axios.post(`/api/v1/profile`, data);
};

const getHistory = () => {
  return axios.get("/api/v1/history");
};

export { postUpdateProfile, getHistory };
