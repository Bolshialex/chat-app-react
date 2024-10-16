import axios from "axios";
const API_URL = "http://localhost:3333/api";

async function registerUser(userInfo) {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userInfo);
    return response.data;
  } catch (error) {
    console.error("Error registering user: ", error);
    throw error;
  }
}

export default { registerUser };
