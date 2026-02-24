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

export { postUpdateProfile };
