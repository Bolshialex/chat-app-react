import axios from "axios";
const API_URL = "http://localhost:3333/api";

function registerUser(userInfo) {
  return axios
    .post(`${API_URL}/users/register`, userInfo)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error registering user: ", error);
      throw error;
    });
}

export default { registerUser };
